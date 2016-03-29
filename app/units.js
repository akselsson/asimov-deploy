/*******************************************************************************
* Copyright (C) 2012 eBay Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
******************************************************************************/

module.exports = function(app, config) {

	var agentApiClient = require('./services/agent-api-client').create(config);

	app.get("/units/list", app.ensureLoggedIn, function(req, res) {
		var group = req.query.group;
		var agentsResp = [];
		agentApiClient.getUnitListForAgentGroup(group, function(results) {

			results.forEach(function(item) {
				agentsResp.push({
					name: item.agent.name,
					group: group,
					loadBalancerState: item.agent.loadBalancerState,
					units: item.units
				});
			});
			res.json(agentsResp);
		});

	});

	app.get("/units/all", app.ensureLoggedIn, function(req, res) {
		res.json(config.agents);
	});

};