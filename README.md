<h1 align="center">
  <a href="https://github.com/palmm/giver" title="Giver">Giver<a>
</h1>

<p align="center">Dependency injection with modern decorators.</p>

<div align="center">
  <img alt="Giver image" height="320" src="https://github.com/palmm/giver/assets/12000567/edb69144-b994-477d-99a7-c8edd29f9ff9" />
</div>

---

Giver (pronounced "_give'r_") is a library that provides dependency injection through modern ECMAScript decorators. With Giver, you can easily achieve inversion of control in your code. Giver has no dependencies, is tiny (~2 KB), and is thoroughly tested.

> [!NOTE]  
> Because the [decorators proposal](https://github.com/tc39/proposal-decorators) is in Stage 3, only some transpilers have released support for decorators syntax. Because of this, Giver can only be used in Typescript or any other compatible transpilation tool.

## Usage

```
import { inject, injectable } from 'giver'

@injectable()
class LoggerService {
  log = (
    message: string
  ) => console.log(message);
}

class MyApplication {
  @inject() loggerService!: LoggerService

  start() {
    this.loggerService.log('Application started');
  }
}

const myApplication = new MyApplication();
myApplication.start();
// Emits "Application started" to the console.
```

## Features

> [!IMPORTANT]
> The current scope of Giver is completely implemented and tested today. That said, Giver is simple and not a full featured DI library, yet.

Giver supports constructor injection of dependencies with a registry.

- Clients inject instances of services.
- Services can be registered for injection.

## Motivation

The existing dependency injection libraries on NPM, at the time of writing, are great; However, they all either:
1) Use experimental decorators.
2) Require dependencies.

So, the motivation for Giver is to be a lightweight, feature filled, tiny DI library.

## Prior art

Giver is inspired by Guice and tsyringe.
