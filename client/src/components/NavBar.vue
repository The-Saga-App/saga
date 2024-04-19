<template>
  <nav class="bg-darkest w-100 flex h3 justify-between items-center mb0 w-100 ba">
    <div class="card">
        <Menubar :model="items" />
    </div>
      <!-- <div class="flex items-center justify-center h-100 ph3">
        <router-link
          to="/"
          class="link">
          <img src="/img/saga-logo-horizontal-dark-mode.svg" class="h2 pt2"/>
        </router-link>
      </div>
      
      <div class="flex items-center h-100 ph3">
        <div class="flex mh3">
          <div class="flex w3 items-center justify-center">
            <span class="">Dashboard</span>
          </div>
        </div>
      </div>
      <div class="flex items-center h-100 ph3">
        <div class="mv0 pv0 flex-auto tr flex flex-row justify-end items-center h-100 ">
          <div class="pv0 flex h-100 items-center">
            <button
              @click="openMenu"
              id="menu-button"
              class="mv0 pv0 pointer link avatar is-empty grow w2 h2 dib br-pill bw1 b--border">
            </button>

            <div id="user-menu-dropdown" class="absolute right-0 top-2 mt4 mh2" v-if="isOpen">
              <div class="mt2 ph2 absolute top-3 right-0 bg-white black br3 shadow flex flex-column w5 pv2 z-5">
                <div>
                  <div class="br3 ma1 black pv2 ph2 flex flex-row items-center">
                    <span></span>
                    <span class="mh2">{{ user?.email }}</span>
                  </div>
                </div>
                <div>
                  <div @click="logout" class="pointer br3 ma1 black hover-bg-light-gray pv2 ph2 flex flex-row items-center">
                    <span>⇥</span>
                    <span class="mh2">Log Out</span>
                  </div>
                </div>
              </div>
              <div class="modal-bg z-4 fixed top-0 left-0 w-100 h-100 bg-black-40 mt0 pointer"></div>
            </div>
          </div>
        </div>
    </div> -->
  </nav>
</template>



<script>
import Menubar from 'primevue/menubar';

export default {
    components: {
        Menubar
    },
    data() {
        return {
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home'
                },
                {
                    label: 'Features',
                    icon: 'pi pi-star'
                },
                {
                    label: 'Projects',
                    icon: 'pi pi-search'
                },
                {
                    label: 'Contact',
                    icon: 'pi pi-envelope'
                }
            ]
        };
    }
};
</script>

<!-- <script lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue';
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  export default {
    setup() {
      const { user, logout } = useAuth0();
      const isOpen = ref(false);

      const closeMenu = (event: any) => {
        if (isOpen.value && event.target?.id !== 'menu-button') {
          isOpen.value = false;
        }
      };

            
      const items = ref([
          {
              label: 'Home',
              icon: 'pi pi-home'
          },
          {
              label: 'Features',
              icon: 'pi pi-star'
          },
          {
              label: 'Projects',
              icon: 'pi pi-search',
              items: [
                  {
                      label: 'Components',
                      icon: 'pi pi-bolt'
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server'
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil'
                  },
                  {
                      label: 'Templates',
                      icon: 'pi pi-palette',
                      items: [
                          {
                              label: 'Apollo',
                              icon: 'pi pi-palette'
                          },
                          {
                              label: 'Ultima',
                              icon: 'pi pi-palette'
                          }
                      ]
                  }
              ]
          },
          {
              label: 'Contact',
              icon: 'pi pi-envelope'
          }
      ]);

      onMounted(() => {
        window.addEventListener('click', closeMenu);
      });

      onBeforeUnmount(() => {
        window.removeEventListener('click', closeMenu);
      });

      return {
        user,
        isOpen: isOpen,
        openMenu() {
          isOpen.value = true;
        },
        logout: () => {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      };
    }
  };
</script> -->
