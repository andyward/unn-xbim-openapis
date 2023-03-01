import { useNavigate } from 'react-router-dom';

const About = () => {
	const navigate = useNavigate();
	return (
		<div className="container">
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
			<div className="title">
				<h1>About this application</h1>
			</div>
			<div className="about-container">
				<p>
					This demo application provides a vary basic viewer of building models using <a href="https://xbim.net/flex-platform/">xbim Flex</a>
				</p>
				<p>
					Out the box it has no connection to the flex service, but we're going to build a simple library that can call xbim Flex and return data. 
				</p>
				<p>Flex has an OpenAPI definition available at <a href="https://apis.xbim-dev.net/openapi/definitions/aim-v2">https://apis.xbim-dev.net/openapi/definitions/aim-v2</a>. You can also view and interact with this 
				API through the developer portal at <a href="https://developers.xbim.net/reference/models_getbytenantid">https://developers.xbim.net/reference/models_getbytenantid</a></p>

				<p>
					Here's how:
					<ol>
						<li>Take a look at the npm <em>package.json</em> in the root of this project</li>
						<ul>
							<li>Note the <em>script</em> section has an entry called '<code>generate</code>'</li>
							<li>You'll see the <code>generate</code> command should invoke this command: <br/>
								<code>&nbsp;&nbsp;openapi --input <b>https://apis.xbim-dev.net/openapi/definitions/aim-v2</b> --output src/flexapi --useOptions</code></li>
							<li><code>openapi</code> is program provided by the <a href="https://www.npmjs.com/package/openapi-typescript-codegen">openapi-typescript-codegen</a> package, which we've included in the <em>devDependencies</em> section of package.json</li>
							<li><em>openapi-typescript-codegen is a library that generates Typescript clients based on the OpenAPI specification.</em></li>
						</ul>
						<li>Now open a Terminal window so we can run this 'generate' script</li>
						<li>In the terminal enter:<br/>
						<code>&nbsp;&nbsp;npm run generate</code>
							</li>
					</ol>
				</p>
			</div>
		</div>
	);
};

export default About;