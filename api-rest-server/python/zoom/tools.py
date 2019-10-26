import json, cherrypy
import simplejson
import urllib2
import zlib
import base64

import functions

from functools import wraps

def jsonify(fn):
	@wraps(fn)
	def wrapped(*args, **kw):
		try:
			'''
				Due the intention of the service, is needed to evaluate the Content-Type to identify the request intention. The application/json
				is normally used for RW actions POST/PUT/PATCH.

			'''

			''' 
				Some browsers do not set Content-Headers in Cors Operation for method OPTIONS.
				In this particular case we don't need to add Cross-Origin validations ...
			'''
			if cherrypy.serving.request.method.upper() == 'OPTIONS':
				pass
			elif cherrypy.serving.request.headers['Content-Type'].lower().find("application/json") != -1 and cherrypy.serving.request.method.upper() in ['POST','PUT','PATCH']:
				kw = dict(kw)

				''' This code normalize the paramets inorder to follow a single Work-Flow. '''
				try:
					body = cherrypy.request.body.read()
					kw.update(json.loads(body))
				except ValueError, err:
					raise cherrypy.HTTPError(400, 'The content is not a valid JSON.')
			elif cherrypy.serving.request.headers['Content-Type'].lower().find("application/json") != -1 and cherrypy.serving.request.method.upper() in ['GET', 'DELETE']:
				raise cherrypy.HTTPError(405, 'The requested Content-Type: application/json is not allow for GET/DELETE.')
			else:
				raise cherrypy.HTTPError(403, 'The requested Content-Type: %s is not allowed for this call.' % cherrypy.serving.request.headers['Content-Type'])

			result = fn( *args, **kw)

		except TypeError, err:
			raise cherrypy.HTTPError(400, str(err))

		cherrypy.response.headers['Content-Type'] = 'application/json;charset=utf-8;'
		return json.dumps(result, ensure_ascii=True)
	return wrapped

def cors(fn):
	@wraps(fn)
	def wrapped(*args, **kw):
		if functions.cors():
			return str(True)
		return fn( *args, **kw)
	return wrapped
