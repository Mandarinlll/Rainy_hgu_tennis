# Rainy_hgu_tennis

北海学園大学テニスサークル「Rainy」の広報用静的サイトです。

## フォルダ構成

```text
Rainy_hgu_tennis/
├─ main/                    # ページ本体（サイトの入口・画面オブジェクト）
│  ├─ index.html
│  ├─ schedule.html
│  ├─ album.html
│  └─ sns.html
├─ resources/               # 画面から参照される共通リソース
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  └─ script.js
│  └─ images/
│     └─ rainy-logo.png
└─ README.md
```

## 設計方針

ページは `main` に集約し、CSS・JavaScript・画像などの再利用リソースは `resources` に分離しています。ページオブジェクトとリソースオブジェクトの責務を分けることで、どのファイルが何を担当しているかを追いやすくしています。

## 表示方法

`main/index.html` をブラウザで開いてください。各ページ間のリンク、CSS、JavaScript、ロゴ画像は新しい構成に合わせて参照先を修正済みです。