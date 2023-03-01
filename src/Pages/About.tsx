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
					This demo application provides a vary basic viewer of building models using the <a href="https://xbim.net/flex-platform/">xbim Flex</a> cloud platform.
				</p>
				<p>
					Out the box this react app has no connection to the Flex service, but we're going to build a simple library that can call xbim Flex and return the data we need.
					<em>Normally</em> you'd probably download a pre-packaged library that <a href="https://www.npmjs.com/package/@xbim/flex-identity-api">already implements</a>&nbsp;
					the openAPI library (from a package managed such as npmjs), but today we're going to build one ourselves so we can see what's involved.
				</p>
				<p>We know Flex has an OpenAPI definition available at <a href="https://apis.xbim-dev.net/openapi/definitions/aim-v2">https://apis.xbim-dev.net/openapi/definitions/aim-v2</a>. You can also view and explore this
					API through the developer portal at <a href="https://developers.xbim.net/reference/models_getbytenantid">https://developers.xbim.net/reference/models_getbytenantid</a>. (This documetation has been generated from the same OpenAPI definition) </p>
				<p>
					We're going to generate our own client library for the Flex OpenAPI in typescript, which we can use straight from React.
				</p>
				<p>
					Here's how:
					<ol>
						<li>Take a look at the npm <em>package.json</em> in the root of this project</li>
						<ul>
							<li>Note the <em>script</em> section has an entry called '<code>generate</code>'</li>
							<li>You'll see the <code>generate</code> command should invoke this command: <br />
								<code>&nbsp;&nbsp;openapi --input <b>https://apis.xbim-dev.net/openapi/definitions/aim-v2</b> --output src/flexapi --useOptions</code></li>
							<li><code>openapi</code> is program provided by the <a href="https://www.npmjs.com/package/openapi-typescript-codegen">openapi-typescript-codegen</a> package, which we've included in the <em>devDependencies</em> section of package.json</li>
							<li><em>openapi-typescript-codegen is a library that generates Typescript clients based on the OpenAPI specification.</em></li>
						</ul>
						<li>Now open a Terminal window so we can run this 'generate' script</li>
						<li>In the terminal enter:<br />
							<code>&nbsp;&nbsp;npm run generate</code>
						</li>
						<ul>
							<li>This will use 'node package manager' (npm) to execute the 'generate' script</li>
						</ul>
						<li>You'll see something like<br />
							<pre>&gt; xbim-flex-openapi-app@0.1.0 generate C:\[some path]]\xbim.flex.react-demo<br />
								&gt; openapi --input https://apis.xbim-dev.net/openapi/definitions/aim-v2 --output src/flexapi --useOptions<br />
								&gt;</pre>
						</li>
						<li>The library will have been generated</li>
					</ol>
				</p>
			</div>
		</div>
	);
};

export default About;