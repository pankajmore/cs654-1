require 'rubygems'
require 'parallel'
require 'tire'

# export LANG=en_US.UTF-8 for invalid encoding error

Tire.configure do
  url "http://172.24.1.166:9200"
end

Tire.index 'wiki' do
  delete
  create :mappings => {
    :article => {
      :properties => {
        :title => { :type => 'string' },
        :text   => { :type => 'string' }
      }
    }
  }

  dir = '/home/pankajm/Downloads/wiki_dump/'

  files = Array.new

  Dir.foreach(dir) do |item|
    next if item == '.' or item == '..'
    # do work on real items
    filename = dir + item
    files.push(filename)
  end

  Parallel.each(files,:in_processes=>10) { |filename|
    Zlib::GzipReader.open(filename) {|gz|
      contents = gz.read
      array = contents.split(/\[{2}/).map{ |el|
        title, text = el.split(/\]{2}\s/)
        {:title => title, :text => text}
      }
      import array
      puts filename
      contents = nil
      array = nil
      }
  }


end
