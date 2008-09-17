# Uncomment this if you reference any of your controllers in activate
# require_dependency 'application'

class ImageUploadFilterExtension < Radiant::Extension
  version "1.0"
  description "Describe your extension here"
  url "http://yourwebsite.com/image_upload_filter"
  
  define_routes do |map|
    map.connect 'admin/image_upload_filter/:action', :controller => 'admin/image_upload_filter'
  end
  
  def activate
    # Load the filter
    ImageUploadFilter
    
    
    # Add the appropriate stylesheets to the javascripts array in the page and snippet controller
    Admin::PageController.class_eval do
      before_filter :add_image_upload_filter_includes, :only => [:edit, :new]
      
      def add_image_upload_filter_includes
        @javascripts << 'extensions/image_upload_filter/image_upload_filter'
        @stylesheets << 'extensions/image_upload_filter/image_upload_filter'
      end
      
    end
    
    Admin::SnippetController.class_eval do
      before_filter :add_image_upload_filter_includes, :only => [:edit, :new]
      
      def add_image_upload_filter_includes
        @javascripts << 'extensions/image_upload_filter/image_upload_filter'
        @stylesheets << 'extensions/image_upload_filter/image_upload_filter'
      end
      
    end
    
  end
  
  def deactivate
  end
  
end