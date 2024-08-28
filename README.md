<h1 align="center">
  <a href="https://github.com/palmm/giver" title="Giver">Giver<a>
</h1>

<p align="center">Dependency injection with modern decorators.</p>

<div align="center">
  <img alt="Giver image" height="320" src="https://github.com/palmm/giver/assets/12000567/edb69144-b994-477d-99a7-c8edd29f9ff9" />
</div>

<div align="center">
  as in:
  
  "I'm really gonna giver when I head down this run"
  <br />
  or
  <br />
  "I don't have to worry about managing dependencies, I just giver and Giver injects my clients with what services they need"
</div>

---

Giver (styled "_give'r_") is a library that provides dependency injection through modern ECMAScript decorators. With Giver, you can easily achieve inversion of control in your code. Giver has no dependencies, is tiny (~2 KB), and is thoroughly tested.

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

Giver supports constructor style injection of dependencies that are resolved with a registry.

- Services can be injected by using the registry.
- Services can be registered for injection.

## Motivation

The existing dependency injection libraries on npm are great; However, at the time of writing, they all either:
1) Use experimental decorators.
2) Require dependencies.

So, the motivation for Giver is to be a lightweight, feature filled, tiny DI library.

## Goals

1) services can be injected like this

```typescript
@injectable()
class MyDependency {
  log = (msg: string) => console.log(msg);
}

@injectable()
class MyOtherDependency {
  getContent = () => "content";
}

@injectable()
class MyService {
  @inject(MyDependency) myDependency!: MyDependency;
  @inject(MyOtherDependency) myOtherDependency!: MyOtherDependency;

  doWork = () => {
    this.myDependency.log(this.myOtherDependency.getContent());
  };
}

const myService = giver.getInstanceOfClass(MyService);
myService.doWork();
```

3) clients can get instances of services like this:

```typescript
const myService = giver.instanceOf(MyService);
```

4) bootstrapping can be done manually:

```typescript
const giver = new Giver();
giver.register(MyService);
giver.register(MyOtherService, Lifetime.SINGLETON);
```

5) circular dependencies are detected and reported

6) services can be registered by any token:

```typescript
type Token = symbol | string | number | Class;
giver.register(MyService, MyServiceToken);
```

7) clients can reference services that are not registered directly (e.g. they are interfaces)

```typescript
class MyService {
  @inject(MyDependencyToken)
  private readonly myDependency!: IMyDependency;
  
  ctor(){}
}
```

### Non-goals as of now

a) services define their lifetime: singleton or transient, like this:

```typescript
@injectable(Lifetime.TRANSIENT | Lifetime.SINGLETON)
class MyService {
  doWork() {}
}

   ...

class MyService {...}
giver.register(MyService, Lifetime.TRANSIENT);
```

b) containers can be created with a parent/child relationship, child containers default to the parents services unless overridden. today, we just have one global container.

c) other registration patterns:
- provide by class
- provide by function (factory)
- provide by value

## Prior art

Giver is inspired by Guice and tsyringe.
