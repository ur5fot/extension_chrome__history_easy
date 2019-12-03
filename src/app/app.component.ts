import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash'
import * as URLParse from 'url-parse'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'extchrombookmarks';
  history;
  structuredByDomain: any;
  test = 1;

  structuredStories(history) {
    let structuredByDomain = [];
    history.forEach((historyItem,) => {
      let url = URLParse(historyItem.url).hostname.replace(/^www./g,'');
      let historyIndexOf = _.findIndex(structuredByDomain, {url});

      if (historyIndexOf < 0) {
        structuredByDomain.push({url, items: [historyItem]});
      } else {
        structuredByDomain[historyIndexOf].items.push(historyItem);
      }
    });

    return structuredByDomain
  }

  ngOnInit() {
    let now = Date.now();
    let startTime = now - 14 * 24 * 60 * 60 * 10000;

    setTimeout(() => {
      chrome.history.search({text: '', startTime,  maxResults: 10000}, (history) => {
        this.history = history;
        this.structuredByDomain = this.structuredStories(history);
        setTimeout(() => document.documentElement.querySelector('button').click(), 20);
      });
    }, 20);

  };
}
