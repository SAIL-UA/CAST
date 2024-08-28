try:
    from ._version import __version__
except ImportError:
    # Fallback when using the package in dev mode without installing
    # in editable mode with pip. It is highly recommended to install
    # the package from a stable release or in editable mode: https://pip.pypa.io/en/stable/topics/local-project-installs/#editable-installs
    import warnings
    warnings.warn("Importing 'myextension' outside a proper installation.")
    __version__ = "dev"
    
from .handler import setup_handlers

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",  # Directory containing the built assets
        "dest": "myextension"   # Name of the JupyterLab extension
    }]


def _jupyter_server_extension_points():
    return [{
        'module': 'myextension',
    }]
def load_jupyter_server_extension(nb_server_app):
    setup_handlers(nb_server_app.web_app)
