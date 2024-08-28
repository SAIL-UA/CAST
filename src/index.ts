import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { NotebookPanel, NotebookActions } from '@jupyterlab/notebook';
import { ICellModel } from '@jupyterlab/cells';
import { requestAPI } from './handler';

/**
 * Initialization data for the myextension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  description: 'A JupyterLab extension that logs executed cells and their outputs.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('JupyterLab extension myextension is activated!');

    // Function to capture executed cell code and output
    const logCellExecution = (notebook: NotebookPanel) => {
      NotebookActions.executed.connect((_, args) => {
        const { cell } = args;
        if (cell.model.type === 'code') {  // Ensure the cell is a code cell
          const codeModel = cell.model as ICellModel;  // Cast model to ICodeCellModel
          const outputs = codeModel.toJSON(); // Get the outputs of the cell

          // Get the current timestamp
          const timestamp = new Date().toISOString();

          // Add the timestamp to the outputs
          const logEntry = {
            ...outputs,
            timestamp: timestamp
          };

          // Log the existing outputs to the console
          console.log(`Outputs: ${JSON.stringify(logEntry)}`);

          requestAPI('log', {
            method: 'POST',
            body: JSON.stringify(logEntry)
          });
        }
      }, notebook);
    };

    // Connect logCellExecution for each notebook opened
    tracker.widgetAdded.connect((sender, notebookPanel) => {
      notebookPanel.context.ready.then(() => {
        logCellExecution(notebookPanel);
      });
    });
  }
};

export default plugin;
