module.exports = `This slash command can help you find who's using which server for testing or deployment.
The available commands are

- \`/snaggg ls\`: Lists all of the resources [NB: servers]
- \`/snaggg [help | halp]\`: Displays this help text
- \`/snaggg claim RESOURCE\`: Claim the named resource for yourself; refer to the output of \`/snaggg ls\` for the expected formatting of the resource name
- \`/snaggg release [RESOURCE]\`: When called without an argument, releases all resources you presently have claimed; when called with an argument, releases only the named resource
- \`/snaggg who [RESOURCE]\`: Lists who has claimed the specified resource; without a resource argument, lists all claimed resources, along with who is using them

If you encounter any bugs, please either yell at me on Slack or open an issue on the project's Github page: https://github.com/chrisbodhi/snag/issues`;
