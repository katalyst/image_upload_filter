namespace :radiant do
  namespace :extensions do
    namespace :image_upload_filter do
      
      desc "Runs the migration of the Image Upload Filter extension"
      task :migrate => :environment do
        require 'radiant/extension_migrator'
        if ENV["VERSION"]
          ImageUploadFilterExtension.migrator.migrate(ENV["VERSION"].to_i)
        else
          ImageUploadFilterExtension.migrator.migrate
        end
      end
      
      desc "Copies public assets of the Image Upload Filter to the instance public/ directory."
      task :update => :environment do
        is_svn_or_dir = proc {|path| path =~ /\.svn/ || File.directory?(path) }
        Dir[ImageUploadFilterExtension.root + "/public/**/*"].reject(&is_svn_or_dir).each do |file|
          path = file.sub(ImageUploadFilterExtension.root, '')
          directory = File.dirname(path)
          puts "Copying #{path}..."
          mkdir_p RAILS_ROOT + directory
          cp file, RAILS_ROOT + path
        end
      end  
    end
  end
end
