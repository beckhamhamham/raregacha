require 'uri'
require 'net/http'
require 'json'
require 'pp'
require 'kconv'
require 'nokogiri'

class PazDoraClient
	@@server = 'pd.appbank.net'

	def setup_http_client
		proxy_addr = 'proxy.hq.sony.co.jp'
		proxy_port = 10080
		http = Net::HTTP::Proxy(proxy_addr, proxy_port).new(@@server)
		http
	end

	def get_monsters num
		res = setup_http_client.start {|http|
		  str = sprintf("%03d", num)
		  http.get("/m#{str}")
		}

		root = Nokogiri::HTML res.body.toutf8
		table_a = root.xpath('//table[@class="detail a"]')
		monster = {}
		begin
			monster[:id] = num
			monster[:rare] = table_a.xpath("tr")[3].xpath("td")[2].inner_text.delete!(" ").size
			monster[:name] = table_a.xpath("tr")[1].xpath("td")[1].xpath("a").inner_text
			monster[:img] = table_a.xpath("tr/th/img")[0]["src"]
			monster[:url] = "http://pd.appbank.net" + table_a.xpath("tr")[1].xpath("td")[1].xpath("a")[0]["href"]
		rescue
			puts num.to_s + " failed!"
			monster = nil
		end
#		puts table_a
		monster

		# table_b =  root.xpath('//table[@class="detail b"]')
		# table_c =  root.xpath('//table[@class="detail c"]')
	end
end

puts "start"

cli = PazDoraClient.new

monsters = []

(1..1250).each do |index|
	puts index if index % 10 == 0
	monster = cli.get_monsters(index)
	monsters << monster if !monster.nil?
end

open("monsters.js", "w") do |io|
	JSON.dump(monsters, io)
end

puts "end"
