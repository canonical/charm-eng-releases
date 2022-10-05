# Charm Engineering Releases

This page catalogues releases from charm engineering teams. Its content automatically generated
every 15 minutes by querying the Github API for information about the Canonical Github org and the
Juju Github org.

The page is published at: https://jnsgruk.github.io/releases

## Developing

```bash
# Clone the repository
git clone https://github.com/jnsgruk/releases
cd releases

# Build and serve the site using Hugo
hugo serve -D
```

The site should now be available at http://0.0.0.0:1313/releases on your local machine.

## Updating Data

`data/repos.json` is automatically rebuilt from a GitHub Action, but you can build it for local
development. The file is generated using [releasegen](https://github.com/jnsgruk/releasegen).

First, create a [GitHub token](https://github.com/settings/tokens) with `repo` permissions and copy
it somewhere safe.

```sh
# Make sure you have golang installed, if you don't already
sudo snap install go --classic

# Get the latest releasegen binary (use @latest if you're feeling dangerous...)
go install github.com/jnsgruk/releasegen@v0.1.3

# Set your Github API token as an environment variable
export RELEASEGEN_TOKEN=ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ

# Run the tool and redirect the output to the data file.
releasegen > data/repos.json
```
