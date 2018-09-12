/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  const element = document.getElementById("team-form")

  if (element != null) {
    const team = JSON.parse(element.dataset.team)
    const players_attributes = JSON.parse(element.dataset.playersAttributes)
    players_attributes.forEach(function(player) { player._destroy = null })
    team.players_attributes = players_attributes

    const app = new Vue({
      el: element,
      mixins: [TurbolinksAdapter],
      data: function() {
        return { team: team }
      },
      methods: {
        addPlayer: function() {
          team.players_attributes.push({
            id: null,
            name: "",
            // position: "",
            _destroy: null,
          })
        },
        removePlayer: function(index) {
          this.team.players_attributes.splice(index, 1)
        }
      }
    })
  }
})

