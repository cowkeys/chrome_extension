// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColors = document.getElementsByClassName('changeColor');

chrome.storage.sync.get('color', function (data) {

  for (var i = 0; i < changeColors.length; i++) {
    changeColors[i].style.backgroundColor = data.color;
    changeColors[i].setAttribute('value', data.color);
  }

  // changeColor.style.backgroundColor = data.color;
  // changeColor.setAttribute('value', data.color);
});

for (var i = 0; i < changeColors.length; i++) {
  changeColors[i].onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
  };
}
