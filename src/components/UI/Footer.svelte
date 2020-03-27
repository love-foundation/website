<style lang="scss">
  footer {
    background: $light-grey;
    padding: 50px 60px;
  }

  ul {
    list-style-type: none;
    li {
      line-height: 33px;
    }
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }

  .blob {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid $black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    align-self: bottom;
    &:hover {
      border-color: $dark-grey;
    }
  }

  .low {
    align-self: flex-end;
  }
</style>

<footer>
  <div class="container fluid">
    <div class="columns">
      <div class="column is-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="about" rel="prefetch">About</a>
          </li>
          <li>
            <a rel="prefetch" href="projects">Projects</a>
          </li>
          <li>
            <a rel="prefetch" href="events">Events</a>
          </li>
          <li>
            <a rel="prefetch" href="artists">Artists</a>
          </li>
          <li>
            <a rel="prefetch" href="lovecasts">Lovecasts</a>
          </li>
        </ul>
      </div>
      <div class="column is-2">
        <div class="content">
          Stichting Love Foundation
          <br />
          Midscheeps 61, 1034TH Amsterdam
          <br />
          Netherlands
          <br />
          <br />
          <a class="email" href="mailto:hello@love-foundation.org">
            hello@love-foundation.org
          </a>
          <br />
          <br />
          Kamer van Koophandel (KvK):
          <br />
          57645906
        </div>
      </div>
      <div class="column" />
      <div class="column is-3 is-flex">
        <div class="columns is-mobile low">
          <a class="column" href="https://www.instagram.com">
            <div class="blob">
              <h2>INS</h2>
            </div>
          </a>
          <a class="column" href="https://www.facebook.com">
            <div class="blob">
              <h2>FB</h2>
            </div>
          </a>
          <a class="column" href="https://www.soundcloud.com/love-foundation">
            <div class="blob">
              <h2>SC</h2>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
