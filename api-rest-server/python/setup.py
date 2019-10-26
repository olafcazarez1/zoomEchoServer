#!/usr/bin/python2.6
import sys
from setuptools import setup, find_packages
from zoom import __version__

setup(
	name='zoom',
	version=__version__,
	packages=find_packages(exclude=('tests','sql', 'conf', 'doc',)),
	py_modules=[],
	author='TodoTek',
	author_email='olafcazarez@gmail.com',
	description='Zoom Echo Server',
	keywords='todotek zoom',
	test_suite='unittests'
)
