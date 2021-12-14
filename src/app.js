import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/lib';

import diagramXML from '../resources/diagram.bpmn';

import { Store } from './service';

const store = new Store();

const LAYOUT_STORE_KEY = 'properties-panel-layout';

// retrieve layout from somwhere externally (e.g. local storage)
const storedLayout = store.get(LAYOUT_STORE_KEY);

const modeler = new BpmnModeler({
  container: '.diagram-container',
  propertiesPanel: {
    parent: '.properties-container',
    layout: storedLayout
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ZeebePropertiesProviderModule,
    zeebeModdleExtensions
  ],
  moddleExtensions: {
    zeebe: zeebeModdle
  }
});

// listen to the event whenever properties panel changes
modeler.on('propertiesPanel.layoutChanged', (event) => {
  const {
    layout
  } = event;

  console.log('Layout changed!', event.layout);

  // persist layout somewhere externally (e.g. local storage)
  store.set(LAYOUT_STORE_KEY, layout);
});

modeler.importXML(diagramXML)
  .then(_ => {
    const canvas = modeler.get('canvas');
    canvas.zoom('fit-viewport');
  })
  .catch(error => {
    console.error(error);
  });
