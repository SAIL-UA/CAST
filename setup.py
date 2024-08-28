from setuptools import setup, find_packages

setup(
    name='myextension',
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'notebook',
        'jupyter_server'
    ],
    entry_points={
        'console_scripts': [
            'myextension = myextension:load_jupyter_server_extension',
        ],
    }
)
