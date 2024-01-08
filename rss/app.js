import fetch from 'node-fetch';
import {JSDOM} from "jsdom"

/*
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Jenn</title>
    <author>Jenn</author>
    <description>Jenn is a self taught web developer who specializes in usability and accessibility.  She is easily spotted at conferences by her bright lipstick and various code dresses and t-shirts.</description>
    <link>https://dev.to/geekgalgroks</link>
    <language>en</language>
    <item>
    ...
    </item>
  </channel>
</rss>
*/

const RSS_URL = `http://feeds.feedburner.com/CssTricks`;

/*
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')
const parser = new DOMParser();
fetch(RSS_URL)
  .then(response => response.text())
  .then(str => parser.parseFromString(str, "text/xml"))
  .then(data => console.log(data))
*/
const dom = await JSDOM.fromURL(RSS_URL, "text/xml");
const doc = dom.window.document;
const channels = doc.getElementsByTagName("channel");
for (const channel of channels) {
  showChannel( channel );
}

function showItem( item ) {
  console.log( "  Item.title " + item.getElementsByTagName("title")[0].textContent );
}

function showChannel( channel ) {
  console.log( "Channel.title " + channel.getElementsByTagName("title")[0].textContent );
  const items = channel.getElementsByTagName("item");
  for (const item of items) {
    showItem( item );
  }
}


