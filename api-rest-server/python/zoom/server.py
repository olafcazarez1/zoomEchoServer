import cherrypy
import logging
import urllib

import json
import re

import tools

from zoom import __version__

class Server(object):

	def __init__(self):
		self.__version = None
		self.logger = logging.getLogger('Zoom.server')

	def set_version( self, version ):
		self.__version = version
			
	def index(self):
		return "ZoomCatalog: on" + ", version: " + str(__version__)

	@tools.cors
	@tools.jsonify
	def get_data(self, *args, **kwargs):
		print args
		print kwargs
		return {"method": cherrypy.serving.request.method, "data": kwargs}