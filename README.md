# jQuery FilePond

jQuery FilePond is a handy jQuery wrapper for FilePond, a JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.

<img src="https://github.com/pqina/filepond-github-assets/blob/master/filepond-animation-01.gif" width="370" height="400" alt=""/>

Install from npm

```bash
npm install jquery-filepond --save
```

Or form a CDN:

```html

<input type="file" class="my-pond" name="filepond"/>

<!-- include jQuery first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>

<!-- include FilePond core -->
<script src="https://unpkg.com/filepond/dist/filepond.min.js"></script>

<!-- include the wrapper -->
<script src="https://unpkg.com/jquery-filepond/filepond.jquery.js"></script>

<script>
  $(function(){

    $('.my-pond').filepond();

    $('.my-pond').filepond('allowMultiple', true);

    $('.my-pond').on('FilePond:addfile', function(e) {
        console.log('file added event', e);
    });

    $('.my-pond').filepond('addFile', 'index.html').then(function(file){
      console.log('file added', file);
    });
  
  });
</script>
```
