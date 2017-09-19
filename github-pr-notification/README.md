## これはなんですか

GithubのPull RequestのOpen Closeを通知するコードです。
AWSのサービスを利用していて、Serverless Frameworkで構成管理されてます。

## 使い方

1. `npm install` or `yarn install` でパッケージをインストールします.
2. `serverless.yml`のenvironmentにslackのやつを記述
 - webhook_url
 - channel
 - username
3. `sls deploy`を実行
4. 表示されるAPIGatewayのEndpointをGithubに登録
 - Repo -> Setting -> Webhook -> Add webhook
 - PayloadURLにAPIGatewayのEndpointを登録 -> `Let me select individual events` -> `Pull request`のみチェック -> Add webhook
