<template>
  <div class="w-full bg-white overflow-y-auto" style="max-width: 1180px">
    <row class="px-2 py-1">
      <btn icon @click.native="$emit('close')">
        <icon :name="icons.close"/>
      </btn>
      <space/>
      <btn icon @click.native="save()">
        <icon :name="icons.save"/>
      </btn>
    </row>
    <textarea id="editor" v-text="editor"></textarea>
  </div>
</template>
<script>
import {mdiCloseOutline, mdiContentSave} from '@mdi/js';

export default {
  props: ['pid' , 'desc'],
  data() {
    return {
      editor: '',
      icons: {
        close: mdiCloseOutline,
        save: mdiContentSave,
      },
      config: {
        toolbar: {
          items: [
            'heading', '|', 'bold', 'italic', 'link', '|', 'alignment', 'bulletedList', 'fontColor', '|',
            'imageUpload', 'blockQuote', 'horizontalLine', '|', 'undo', 'redo',
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
          uploadUrl: 'https//127.0.0.1:3333/blog/photo',
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
    async save() {
      await this.axios.put('/xproduct/' + this.pid + '/description', {description: this.editor})
      this.$emit('close')
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
                self.$axios({method: 'post', url: '/blog/photo/delete', baseURL: 'https//127.0.0.1:3333', data: {photo: image}}).then(res => res.data).catch(() => 401);
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
    }
  },
  mounted() {
    this.run()
    this.editor = this.desc
    window.images = [];
  },
}
</script>
