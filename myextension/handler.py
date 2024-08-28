import os
import json
from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

class LogExecutionHandler(APIHandler):
    @tornado.web.authenticated
    def post(self):
        try:
            data = self.get_json_body()

            log_file = '/Users/ethan/workspace/log_file.json'   # Change this path to your desired log file location

            with open(log_file, 'a') as f:
                f.write(json.dumps(data))
                f.write("\n")  # Ensure each entry is on a new line

            self.finish(json.dumps({'status': 'success'}))
        except Exception as e:
            self.log.error(f"Error logging execution: {e}")
            self.set_status(500)
            self.finish(json.dumps({'status': 'error', 'message': str(e)}))

def setup_handlers(web_app):
    host_pattern = '.*$'
    base_url = web_app.settings['base_url']
    route_pattern = url_path_join(base_url, 'log')
    handlers = [(route_pattern, LogExecutionHandler)]
    web_app.add_handlers(host_pattern, handlers)
