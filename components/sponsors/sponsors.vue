<template>
  <div class='sponsors'>
    <h2>Sponsors</h2>
    <div class="speakers-wrapper">
      <div v-for="sponsor in sponsors" :key="sponsor.name">
        <div class="speaker" on-tap="_openSpeaker" ga-on="click" ga-event-category="speaker" ga-event-action="open details" :ga-event-label$="sponsor.name">
          <div class="description">
            <text-truncate lines="1">
              <div class="sponsors-avatar">
                <img :src="sponsor.photoUrl" alt="avatar">
              </div>
            </text-truncate>
            <text-truncate lines="1">
              <h3 class="name">{{sponsor.name}}</h3>
            </text-truncate>
            <text-truncate lines="1">
              <div class="origin"></div>
            </text-truncate>
          </div>
        </div>
      </div>
    </div>

    <h2>Judges</h2>
    <div class="speakers-wrapper">
      <div v-for="speaker in speakers" :key="speaker.name">
        <div class="speaker" on-tap="_openSpeaker" ga-on="click" ga-event-category="speaker" ga-event-action="open details" :ga-event-label$="speaker.name">
          <div class="description">
            <text-truncate lines="1">
              <div class="sponsors-avatar">
                <img :src="speaker.photoUrl" alt="avatar">
              </div>
            </text-truncate>
            <text-truncate lines="1">
              <h3 class="name">{{speaker.name}}</h3>
            </text-truncate>
            <text-truncate lines="1">
              <div class="origin"></div>
            </text-truncate>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'sponsors',
    data() {
      return {
        sponsors: [
          {'name': 'Near', 'photoUrl': 'https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1562682928'},
          {
            'name': 'DAO Square',
            'photoUrl': 'https://ssimg.frontenduse.top/avatar/2020/02/19/998392f4a28ec5e0aeb64a9e695260e7.png'
          },
          {
            'name': 'DAO Fest',
            'photoUrl': 'https://assets.website-files.com/5cf656bb29dfdac145d337e0/5cf656bb29dfdafd38d3381a_DAOfest%20id1Artboard%2011set1Transp.png'
          },
          {'name': 'Indie Light', 'photoUrl': 'http://www.indielight.net/App_Themes/Website/images/logo2.png'},
          {'name': 'Meta Cartel', 'photoUrl': 'https://www.ethdenver.com/wp-content/uploads/2020/02/meta_chillcopy.png'}
        ],
        speakers: [
          {'name': 'Illia Polosukhin', 'photoUrl': 'https://www.ethdenver.com/wp-content/uploads/2020/01/illia-250x250.jpg'},
          {'name': 'Vincent Niu', 'photoUrl': 'https://www.nft.nyc/hubfs/Vincent-photo.jpg'},
          {'name': 'Tina Zhen', 'photoUrl': 'https://pbs.twimg.com/profile_images/1177965467572428800/mWBN6yqP_400x400.jpg'}
        ]
      }
    }
  }
</script>

<style scoped>
  :host {
    display: block;
  }

  .hh {
    text-align: center;
    font-weight: bold;
    padding: 0;
    margin: 0 0 60px;
  }

  .speakers-wrapper {
    margin: 40px 0 32px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px 16px;
    color: #1a1a1a;
  }

  .speaker {
    text-align: center;
    cursor: pointer;
  }

  .photo {
    width: 72px;
    height: 72px;
    background-color: var(--accent-color);
    border-radius: 50%;
    overflow: hidden;
    transform: translateZ(0);
  }

  .badges {
    position: absolute;
    top: 0;
    left: calc(50% + 24px);
  }

  .badge {
    margin-left: -10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #fff;
    transition: transform var(--animation);
  }

  .badge:hover {
    transform: scale(1.1);
  }

  .badge:nth-of-type(2) {
    transform: translate(0, 100%);
  }

  .badge:nth-of-type(2):hover {
    transform: translate3d(0, 100%, 20px) scale(1.1);
  }

  .badge-icon {
    --iron-icon-width: 12px;
    --iron-icon-height: 12px;
    color: #fff;
  }

  .company-logo {
    margin-top: 6px;
    width: 100%;
    height: 16px;
  }

  .description {
    color: var(--primary-text-color);
  }

  .name {
    margin-top: 8px;
    line-height: 1.1;
  }

  .origin {
    margin-top: 4px;
    font-size: 14px;
    line-height: 1.1;
  }

  .cta-button {
    margin-top: 24px;
  }

  @media (min-width: 640px) {
    .photo {
      width: 128px;
      height: 128px;
    }

    .name {
      font-size: 24px;
    }
  }

  @media (min-width: 812px) {
    .speakers-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }

    .speaker:last-of-type {
      display: none;
    }

    .badges {
      left: calc(50% + 32px);
    }

    .badge:nth-of-type(2) {
      transform: translate(25%, 75%);
    }

    .badge:nth-of-type(2):hover {
      transform: translate3d(25%, 75%, 20px) scale(1.1);
    }
  }

  @media (min-width: 1024px) {
    .speakers-wrapper {
      grid-template-columns: repeat(4, 1fr);
    }

    .speaker:last-of-type {
      display: block;
    }
  }

  .sponsors {
    color: #1a1a1a;
    background-color: rgba(255, 255, 255, 0.0);
  }

  .sponsors h2 {
    text-align: center;
    font-weight: bold;
    padding: 0;
    margin: 0 0 60px;
  }

  .sponsors-avatar {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 auto 20px;
  }

  .sponsors-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
