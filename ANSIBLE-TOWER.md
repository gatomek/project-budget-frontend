# Castle

## Setup App

```sh
docker --context docker-on-tower compose --file remote-ansible.yml run --rm --build setup-app
```

## Teardown App

```sh
docker --context docker-on-tower compose --file remote-ansible.yml run --rm --build teardown-app
```
