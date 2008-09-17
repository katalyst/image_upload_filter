class ImageUploadFilter < TextFilter
  filter_name "ImageUpload"
  description_file File.dirname(__FILE__) + "/../tinymce.html"
  def filter(text)
    text
  end
end