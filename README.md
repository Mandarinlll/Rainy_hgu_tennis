# Rainy_hgu_tennis

北海学園大学テニスサークル「Rainy」の広報用サイトです。

## フォルダ構成

```text
Rainy_hgu_tennis/
├─ index.html               # ルートURL用の入口（main/index.htmlへ転送）
├─ schedule.html            # 旧URL互換用の入口
├─ album.html               # 旧URL互換用の入口
├─ sns.html                 # 旧URL互換用の入口
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

通常のサイトURL、またはルート直下の `index.html` から表示できます。実体ページは `main/` に置き、ルート直下のHTMLは既存URLを壊さないために各 `main/*.html` へ転送します。

各ページ間のリンク、CSS、JavaScript、ロゴ画像は新しい構成に合わせて参照先を修正済みです。
