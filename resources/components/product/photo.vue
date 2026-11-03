<template>
  <xdialog v-model="dialog" fullscreen>
    <template #active="{active}">
      <div class="relative rounded-xl overflow-hidden">
        <div class="overflow-hidden" @click="active" @mouseleave="mouseLeave($event)" @mousemove="moveMainHolder($event)" @mouseover="mouseHover($event)">
          <img id="mainHolder" :alt="name" :height="large ? '750' : '400'" :src="large ? selectedPhoto.large : selectedPhoto.normal" :width="large ? '750' : '400'"
               class="cursor-pointer w-full ease-linear duration-75 transition-transform"
               draggable="false">
        </div>
        <div class="absolute rounded-xl flex bottom-3 left-3 bg-neutral-700 py-1 px-3">
          <span class="pl-1 pt-1  text-white" v-text="getNumber(photos.length)"></span>
          <icon :name="icons.photo" class="text-white" size="14"/>
        </div>
      </div>
    </template>
    <div class="bg-[#ffffffaa] w-full h-full">
      <row class="w-full bg-white h-20 px-3">
        <btn icon @click.native="close()">
          <icon :name="icons.close"/>
        </btn>
      </row>
      <div class="w-full flex items-center h-[calc(100%-160px)] overflow-hidden" @click="click($event)" @mousemove="moveDialogHolder($event)" @touchmove="touchMove($event)"
           @touchstart="touchStart($event)" @touchend.stop="touchEnd($event)">
        <div id="dialog" class="flex h-full items-center">
          <div v-for="img in photos" :class="wider && 'h-full'" class="flex w-screen">
            <img :alt="name" :src="img.orginal" :style="zoom ? 'cursor: zoom-out' : 'cursor: zoom-in'"
                 class="mx-auto ease-linear duration-75 transition-transform" draggable="false">
          </div>
        </div>
      </div>
      <div class="flex bg-white h-20 py-2 overflow-x-auto md:justify-center">
        <img v-for="(img , index) in photos" :alt="name" :class="selectedPhoto === img ? 'border-neutral-600' : 'border-neutral-100'"
             :src="img.small" class="border-b-4 pb-0.5 duration-300 transition-all transform active:scale-95 cursor-pointer mx-1 h-16 w-16"
             @click="selectPhoto(img , index)"/>
      </div>
    </div>
  </xdialog>
</template>
<script>
import {mdiCloseOutline, mdiImageMultipleOutline} from '@mdi/js';

export default {
  props: ['photos', "name"],
  data() {
    return {
      maY: 0,
      maX: 0,
      moveX: 0,
      moveY: 0,
      index: 0,
      swipeX: 0,
      touchX: 0,
      touchY: 0,
      tapCount: 0,
      zoom: false,
      swipeMove: 0,
      wider: false,
      touch: false,
      large: false,
      dialog: false,
      moveMain: false,
      tapTwice: false,
      images: this.photos,
      selectedPhoto: this.photos[0],
      icons: {
        close: mdiCloseOutline,
        photo: mdiImageMultipleOutline,
      },
      click(e) {
        ++this.tapCount;
        this.tapTwice = this.tapCount > 1
        setTimeout(() => {
          this.tapCount = 0
        }, 300)
        if (this.touch && !this.tapTwice) return
        if (this.zoom) {
          this.resetScale()
        } else {
          this.zoom = true
          this.maX = 0.4375 * (document.getElementById('dialog').children[this.index].firstChild.clientWidth / 2)
          this.maY = 0.4375 * (document.getElementById('dialog').children[this.index].firstChild.clientHeight / 2)
          this.moveX = 0.4375 * ((document.getElementById('dialog').children[this.index].firstChild.clientWidth / 2) - e.offsetX)
          this.moveY = 0.4375 * ((document.getElementById('dialog').children[this.index].firstChild.clientHeight / 2) - e.offsetY)
          setTimeout(() => document.getElementById('dialog').children[this.index].firstChild.style.transform = 'scale(1.75) translate3d(' + (this.moveX * 0.6) + 'px,' + (this.moveY * 0.6) + 'px,' + '0px)', 1)
        }
      },
      close() {
        this.zoom = false
        this.dialog = false
      },
      touchStart(e) {
        this.swipeX = e.changedTouches[0].clientX
        this.touchX = e.changedTouches[0].clientX
        this.touchY = e.changedTouches[0].clientY
      },
      touchMove(e) {
        if (!this.zoom) {
          let moveX = e.changedTouches[0].clientX - this.touchX
          moveX > 0 ? this.swipeMove += moveX : this.swipeMove -= -moveX
          document.getElementById('dialog').style.transform = 'translate3d(' + (this.swipeMove) + 'px , 0px , 0px)'
          this.touchX = e.changedTouches[0].clientX
          return
        }
        let moveX = e.changedTouches[0].clientX - this.touchX
        let moveY = e.changedTouches[0].clientY - this.touchY
        moveX > 0 ? this.moveX += moveX : this.moveX -= -moveX
        moveY > 0 ? this.moveY += moveY : this.moveY -= -moveY
        document.getElementById('dialog').children[this.index].firstChild.style.transform = 'scale(1.75) translate3d(' + (this.moveX * 0.6) + 'px,' + (this.moveY * 0.6) + 'px,' + '0px)'
        this.touchX = e.changedTouches[0].clientX
        this.touchY = e.changedTouches[0].clientY
      },
      touchEnd(e) {
        if (this.zoom) return
        const amount = this.swipeX - e.changedTouches[0].clientX
        const needed = window.innerWidth / 4
        if (amount > -needed && amount < needed) {
          document.getElementById('dialog').classList.add('transition-transform', 'duration-150')
          document.getElementById('dialog').style.transform = 'translateX(' + window.innerWidth * (this.index) + 'px)'
          setTimeout(() => {
            document.getElementById('dialog').classList.remove('transition-transform', 'duration-150')
            this.swipeMove = window.innerWidth * (this.index)
          }, 150)
        } else {
          if (amount > needed && this.index > 0) {
            --this.index
          }
          if (amount < -needed && this.index < this.images.length - 1) {
            ++this.index
          }
          this.selectedPhoto = this.images[this.index]
          document.getElementById('dialog').classList.add('transition-transform', 'duration-150')
          document.getElementById('dialog').style.transform = 'translateX(' + window.innerWidth * (this.index) + 'px)'
          setTimeout(() => {
            document.getElementById('dialog').classList.remove('transition-transform', 'duration-150')
            this.swipeMove = window.innerWidth * (this.index)
          }, 150)
        }
      },
      mouseMove(e) {
        if (this.touch) return
        if (this.moveX > this.maX) this.moveX = this.maX
        else if (this.moveX < -this.maX) this.moveX = -this.maX
        else e.movementX >= 0 ? this.moveX += -e.movementX / 2.2 : this.moveX -= e.movementX / 2.2
        if (this.moveY > this.maY) this.moveY = this.maY
        else if (this.moveY < -this.maY) this.moveY = -this.maY
        else e.movementY >= 0 ? this.moveY += -e.movementY / 2.2 : this.moveY -= e.movementY / 2.2
      },
      moveMainHolder(e) {
        if (this.moveMain && this.moveMain) {
          this.mouseMove(e)
          document.getElementById('mainHolder').style.transform = 'scale(1.75) translate3d(' + (this.moveX) + 'px,' + (this.moveY) + 'px,' + '0px)'
        }
      },
      moveDialogHolder(e) {
        if (this.touch) return
        if (this.zoom) {
          this.mouseMove(e)
          document.getElementById('dialog').children[this.index].firstChild.style.transform = 'scale(1.75) translate3d(' + (this.moveX) + 'px,' + (this.moveY) + 'px,' + '0px)'
        }
      },
      mouseHover(e) {
        if (this.moveMain || this.touch) return
        this.moveMain = true
        this.maX = 0.4375 * (document.getElementById('mainHolder').clientWidth / 2)
        this.maY = 0.4375 * (document.getElementById('mainHolder').clientHeight / 2)
        this.moveX = 0.4375 * ((document.getElementById('mainHolder').clientWidth / 2) - e.offsetX)
        this.moveY = 0.4375 * ((document.getElementById('mainHolder').clientHeight / 2) - e.offsetY)
        document.getElementById('mainHolder').style.transform = 'scale(1.75) translate3d(' + (this.moveX) + 'px,' + (this.moveY) + 'px,' + '0px)'
      },
      mouseLeave() {
        if (this.touch) return
        this.moveX = 0
        this.moveY = 0
        this.moveMain = false
        document.getElementById('mainHolder').style.transform = 'scale(1)'
      },
      selectPhoto(img, index) {
        this.resetScale()
        this.index = index
        document.getElementById('dialog').classList.add('transition-transform', 'duration-150')
        document.getElementById('dialog').style.transform = 'translateX(' + window.innerWidth * (index) + 'px)'
        this.selectedPhoto = img
        setTimeout(() => {
          document.getElementById('dialog').classList.remove('transition-transform', 'duration-150')
          this.swipeMove = window.innerWidth * (this.index)
        }, 150)
      },
      resetScale() {
        this.zoom = false
        this.moveX = 0
        this.moveY = 0
        document.getElementById('dialog').children[this.index].firstChild.style.transform = 'scale(1)'
      }
    }
  },
  mounted() {
    this.wider = window.innerWidth > window.innerHeight
    if (window.innerWidth > 1024) this.large = true
    this.touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
  }
}
</script>
