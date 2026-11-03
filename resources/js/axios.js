import axios from "axios";

const isServer = typeof window === 'undefined'

export default axios.create({
  // Browser: same origin (works on the server and locally).
  // SSR (Node): relative URLs are invalid, so call the local HTTP server.
  baseURL: isServer ? `http://127.0.0.1:${process.env.PORT || 6000}` : '',
  credentials: true,
  header: {
    common: {
      'Accept': 'application/json',
      'X-Requested-By': 'XMLHttpRequest'
    },
  }
})
