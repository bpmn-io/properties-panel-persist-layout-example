# properties-panel-persist-layout-example

[![CI](https://github.com/bpmn-io/properties-panel-persist-layout-example/workflows/CI/badge.svg)](https://github.com/bpmn-io/properties-panel-persist-layout-example/actions?query=workflow%3ACI)

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) and [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel). It implements a BPMN 2.0 modeler that persists layout changes in the properties panel via local storage.

## About

This example uses the [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist the layout state of the properties panel.

When creating the Modeler, it retrieves the layout directly from the storage and puts it into the `propertiesPanel.layout` configuration.

```js
const LAYOUT_STORE_KEY = 'properties-panel-layout';

const storedLayout = store.get(LAYOUT_STORE_KEY);

const modeler = new BpmnModeler({
  container: '.diagram-container',
  propertiesPanel: {
    parent: '.properties-container',
    layout: storedLayout
  }
});
```

Listen to the `propertiesPanel.layoutChanged` event to react on any layout change happening in the properties panel, for example, when a group got expanded or collapsed.

We use this one to set the layout into the storage.

```js
modeler.on('propertiesPanel.layoutChanged', (event) => {
  const {
    layout
  } = event;

  store.set(LAYOUT_STORE_KEY, layout);
});
```

If you reload the page, it retrieves the previously persisted configuration again and hooks it into the Modeler.

Check out the [complete example](./src/app.js) to gather more information.


## Building the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) and installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the example using [webpack](https://webpack.js.org/) via

```
npm start
```

You may also spawn a development setup by executing

```
npm run dev
```
