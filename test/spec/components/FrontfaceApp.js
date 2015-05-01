'use strict';

describe('FrontfaceApp', function () {
  var React = require('react/addons');
  var FrontfaceApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    FrontfaceApp = require('components/FrontfaceApp.js');
    component = React.createElement(FrontfaceApp);
  });

  it('should create a new instance of FrontfaceApp', function () {
    expect(component).toBeDefined();
  });
});
