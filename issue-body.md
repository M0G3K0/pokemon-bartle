## 概要
dependency-cruiserがレイヤー境界違反を検出。`core/`が`features/`に依存している箇所を修正する。

## 違反内容
```
core → features 違反:
src/app/core/components/chip/chip.component.ts
    → src/app/features/type-icon/type-icon.component.ts
```

## 対応方針
`TypeIconComponent`を`features/`から`core/components/`に移動する。

### 理由
- `TypeIconComponent`は`core/`から使われている
- 再利用可能な汎用コンポーネントは`core/`に属すべき

## タスク
- [ ] `TypeIconComponent`を`core/components/`に移動
- [ ] import文を更新
- [ ] `npm run dep-check`で違反が解消されたことを確認
