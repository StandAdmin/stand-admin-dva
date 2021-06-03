# CRUD framework works

### Important

Wrap App with `DvaContainer`:

```jsx
import { DvaContainer } from 'stand-admin-dva';

const App = props => {
  return (
    {/* 使用 DvaContainer 包裹 */}
    <DvaContainer appOptions={{ history: 'browser' }}>
      <MyApp {...props} />
    </DvaContainer>
  );
};
```

### Demos

Same with [stand-admin-antdpro](https://www.npmjs.com/package/stand-admin-antdpro), just replace `stand-admin-antdpro` with `stand-admin-dva`.

[Antd Pro Demos](https://github.com/rooseve/stand-admin-antdpro-demo)

Just download and play!
