/*
 * Copyright (c) 2018-2023 "Graph Foundation"
 * Graph Foundation, Inc. [https://graphfoundation.org]
 *
 * This file is part of ONgDB.
 *
 * ONgDB is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var express = require('express')
var https = require('https')
var fs = require('fs')
const path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, './public')))

var options = {
  key: fs.readFileSync(path.join(__dirname, './keys/private.key')),
  cert: fs.readFileSync(path.join(__dirname, './keys/certificate.pem'))
}
var secureServer = https.createServer(options, app).listen(9001, function () {
  var host = secureServer.address().address
  var port = secureServer.address().port

  console.log('Sync server listening at https://%s:%s', host, port)
})
