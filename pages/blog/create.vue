<template>
  <container class="mt-4">
    <div class="p-4 rounded-xl bg-neutral-100">
      <row>
        <w>
          <div class="bg-neutral-200 rounded-xl justify-center py-4 min-h-[100px] p-4" @click="showUpload">
            <div ref="img" class="flex"></div>
          </div>
          <input ref="upload" class="transform h-0 w-0" type="file" @change="upload($event)">
        </w>
        <w>
          <xinput v-model="title" name="تیتر"/>
        </w>
        <w class="mt-4">
          <xinput v-model="short" name="توضیحات"/>
        </w>
        <w class="mt-4">
          <span class="px-1">متن</span>
          <span v-text="(editor.length > 0)  ? getNumber(editor.split(' ').length) + ' کلمه': ''"></span>
          <w class="mt-2">
            <textarea id="editor" v-text="editor"></textarea>
          </w>
        </w>
        <w class="mt-4">
          <btn class="border rounded-xl border-gray-500" @click.native="createPost">ایجاد پست</btn>
        </w>
      </row>
    </div>
  </container>
  <inertia-head>
    <title>ایجاد پست</title>
  </inertia-head>
</template>
<script>
import {mdiMinus, mdiPlus} from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        plus: mdiPlus,
        minus: mdiMinus,
      },
      editor: '',
      photo: null,
      title: '',
      short: '',
      text: '',
      config: {
        toolbar: {
          items: [
            'heading', '|', 'bold', 'italic', 'link', '|', 'alignment', 'bulletedList', 'fontColor', '|',
            'imageUpload', 'insertTable', 'blockQuote', 'horizontalLine', '|', 'undo', 'redo',
          ]
        },
        image: {
          toolbar: ["imageTextAlternative", 'imageResize:300', 'imageResize:500', 'imageResize:800', 'imageResize:original'],
          resizeUnit: 'px',
          upload: {
            types: ['png', 'jpeg', 'svg+xml']
          },
          resizeOptions: [
            {
              name: 'imageResize:300',
              value: '300',
              icon: 'small'
            },
            {
              name: 'imageResize:500',
              value: '500',
              icon: 'medium'
            },
            {
              name: 'imageResize:800',
              value: '800',
              icon: 'large'
            },
            {
              name: 'imageResize:original',
              value: null,
              icon: 'original'
            },
          ],
        },
        simpleUpload: {
          uploadUrl: 'https://wallexy.ir/blog/photo',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
        },
        language: 'fa',
        heading: {
          options: [
            {model: 'heading2', view: 'h2', title: 'عنوان بزرگ', class: 'ck-heading_heading2'},
            {model: 'heading3', view: 'h3', title: 'عنوان متوسط', class: 'ck-heading_heading3'},
            {model: 'heading4', view: 'h4', title: 'عنوان کوچک', class: 'ck-heading_heading4'},
            {model: 'paragraph', title: 'پاراگرف', class: 'ck-heading_paragraph'},
          ]
        }
      }
    }
  },
  methods: {
    createPost() {
      let formDate = new FormData();
      formDate.append('image', this.photo)
      formDate.append('title', this.title)
      formDate.append('short', this.short)
      formDate.append('content', this.editor)
      this.axios.post('/blog', formDate)
        .then(() => this.$store.dispatch('alerts/update', {message: 'پست با موفقیت ایجاد شد', type: 'success'}))
        .catch(() => this.$store.dispatch('alerts/update', {message: 'خطا .', type: 'error'}))
    },
    run() {
      let self = this
      ClassicEditor.create(document.querySelector('#editor'), this.config)
        .then(editor => {
          editor.model.document.on('change:data', () => {
            let imagesCache = [];
            Array.from(new DOMParser().parseFromString(editor.getData(), 'text/html').querySelectorAll('img')).map(function (image) {
              if (image.hasAttribute('src') && !imagesCache.includes(image.getAttribute('src')))
                imagesCache.push(image.getAttribute('src'));
            });
            window.images.forEach(function (image) {
              if (!imagesCache.includes(image))
                self.axios({method: 'post', url: '/blog/photo/delete', baseURL: 'https://wallexy.ir', data: {photo: image}}).then(res => res.data).catch(() => 401);
            })
            window.images = imagesCache;
            self.editor = editor.getData()
          });
          Array.from(new DOMParser().parseFromString(editor.getData(), 'text/html').querySelectorAll('img')).map(function (image) {
            window.images.push(image.getAttribute('src'));
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    clearFiles() {
      this.photo = null;
      this.$refs.img.innerHTML = '';
    },
    showUpload() {
      this.$refs.upload.click()
    },
    upload(ev) {
      this.clearFiles();
      this.photo = ev.target.files[0];
      let fileReader = new FileReader()
      fileReader.onload = (evn) => {
        let image = new Image();
        image.title = evn.name;
        image.src = evn.target.result;
        this.$refs.img.appendChild(image);
      }
      fileReader.readAsDataURL(this.photo)
    }
  },
  mounted() {
    setTimeout(() => this.run(), 500)
    if (document.getElementById('ckeditor')) return;
    let editor = document.createElement('SCRIPT');
    editor.src = '/extra/ckeditor.js'
    editor.id = 'ckeditor'
    document.body.appendChild(editor)
    window.images = [];
  }
}
</script>
