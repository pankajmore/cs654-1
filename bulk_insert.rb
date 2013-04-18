require 'rubygems'
require 'tire'

# export LANG=en_US.UTF-8 for invalid encoding error

Tire.configure do
  url "http://172.27.19.55:9200"
end

Tire.index 'bulk_test' do
  delete
  create :mappings => {
    :article => {
      :properties => {
        :text   => { :type => 'string', :analyzer => { :filter => 'html_strip' } },
      }
    }
  }

files = Array.new

  Dir.foreach('/home/pankajm/Dropbox/urls') do |item|
    next if item == '.' or item == '..'
    files.push(item)
  end

N = 400
for i in 1..files.length/N
  bulk = []
  begin
    for j in 1..N
      filename = files.at(j + (i-1)*N)
      bulk.push({:text => File.read("/home/pankajm/Dropbox/urls/#{filename}")})
    end
    import bulk
  rescue ArgumentError
    puts "Error "
  else
    puts "Success" + ((i-1)*N).to_s
  end

end

  # Dir.foreach('/home/pankajm/Dropbox/urls') do |item|
  #   next if item == '.' or item == '..'
  #   # do work on real items
  #   begin
  #     store :text => File.read("/home/pankajm/Dropbox/urls/#{item}")
  #   rescue ArgumentError
  #     puts "Error " + item
  #   else
  #     puts "Storing " + item
  #   end
  # end

end
