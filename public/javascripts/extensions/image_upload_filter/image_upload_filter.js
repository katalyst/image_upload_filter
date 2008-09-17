var existing_urls = [];
var uploads_to_save = [];

function image_upload_filter_input_method(index, filter)
{
   if (index != null)
   {
      // control for page parts
      var elem = $('part_'+index+'_content');
      var image_url = elem.value;
      var has_image = image_url != '';
      
      if(has_image) existing_urls[index] = $('part_' + index + '_content').value;

      if (filter == "ImageUpload")
      {
         var out = "<div class=\"image_upload_filter\" id=\"image_upload_filter_" + index + "\">"
          + "  <div class=\"image_upload_filter_image\">"
          + "    <img width=\"200\" " + (has_image ? "src=\"" + image_url + "\"" : "") + " id=\"image_upload_filter_" + index + "_image\"/>"
          + "  </div>"
          + "  <div class=\"image_upload_filter_options\">"
          + "    <select class=\"image_upload_filter_select\" id=\"image_upload_filter_" + index + "_select\">"
          + "      <option value=\"no_image\">No Image</option>"
          + "      " + (has_image ? "<option value=\"keep_same_image\" selected=\"selected\">Keep Same Image</option>" : "") + ""
          + "      <option value=\"upload_new_image\"" + (!has_image ? " selected=\"selected\"" : "") + ">Upload new Image</option>"
          + "    </select>"
          + "    <div class=\"image_upload_filter_file_wrap\" id=\"image_upload_filter_" + index + "_file_wrap\"" + (has_image ? " style=\"display: none;\"" : "") + ">"
          + "      <iframe class=\"image_upload_filter_iframe\" id=\"image_upload_filter_" + index + "_iframe\" src=\"/admin/image_upload_filter/upload\" frameborder=\"no\"></iframe>"
          + "      <input type=\"button\" id=\"image_upload_filter_" + index + "_file_submit\" value=\"Upload!\" />"
          + "    </div>"
          + "  </div>"
          + "  <div class=\"image_upload_filter_clear\"></div>"
          + "</div>";
         elem.up().insert(out);

         Event.observe($("image_upload_filter_" + index + "_select"), 'change', function(e) {
            var ele = e.element();
            if(ele.value == 'no_image')
            {
               $("image_upload_filter_" + index + "_image").src = "about:blank";
               $('part_' + index + '_content').value = 'about:blank';
               $("image_upload_filter_" + index + "_file_wrap").style.display = "none";
            }
            else if(ele.value == 'keep_same_image')
            { 
               $("image_upload_filter_" + index + "_image").src = existing_urls[index];
               $('part_' + index + '_content').value = existing_urls[index];
               $("image_upload_filter_" + index + "_file_wrap").style.display = "none";
            }
            else if(ele.value == 'upload_new_image')
            {
               $("image_upload_filter_" + index + "_image").src = 'about:blank';
               $('part_' + index + '_content').value = existing_urls[index];
               $("image_upload_filter_" + index + "_file_wrap").style.display = "";
            }
         });

         Event.observe($("image_upload_filter_" + index + "_file_submit"), 'click', function(e)
         {
            var frame = $("image_upload_filter_" + index + "_iframe");
            var doc = frame.contentDocument || frame.contentWindow.document;
            var form = doc.forms[0];
            form.elements[1].value = index;
            if(form.elements[2].value != "") form.submit();
         });
         setTimeout("$('part_"+index+"_content').style.display = 'none'", 1);
      }
      else
      {
         
      }
   }
   else
   {
      //ignore for snippets
   }

Event.observe(window, 'load', init_load_image_upload_filter, false);

function init_load_image_upload_filter()
{
   // loads ImageUpload editor if "ImageUpload" is the selected text filter

   // check to see if we are working with a page or with a snippet
   if($('part[0][filter_id]') || $('part_0_filter_id'))
   {
      parts = $('pages').getElementsByTagName('textarea');
      for(var i = 0; i < parts.length; i++)
      {
         select = $('part[' + i + '][filter_id]') || $('part_' + i + '_filter_id')
         if ($F(select) == 'ImageUpload')
         {
            image_upload_filter_input_method(i, 'ImageUpload');
         }

         Event.observe(select, 'change', function(event)
         {
            element = Event.element(event);
            id = parseInt(element.id.replace("part[", "").replace("][filter_id]").replace("part_", "").replace("_filter_id"));
            image_upload_filter_input_method(id, $F(element));
         });

      }
   }
   else if($('snippet[filter_id]')) 
   {
      if($F('snippet[filter_id]') == 'ImageUpload') 
      {
         image_upload_filter_input_method(null, 'ImageUpload');
      }

      Event.observe($('snippet[filter_id]'), 'change', function(event)
      {
         element = Event.element(event);
         image_upload_filter_input_method(null, $F(element));
      });
   }
}

function image_upload_filter_finish_upload(index, url)
{
   $("part_" + index + "_content").value = url;
   $("image_upload_filter_" + index + "_image").src = url;
}