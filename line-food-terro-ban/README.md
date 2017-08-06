# これはなんですか

飯テロを撃退するbotです。  
AWSのサービスを利用してます。  
ServerlessFrameworkで構成管理されています。

# 使い方

1.  `npm install` or `yarn install`でパッケージをインストールします.
2. `serverless.yml`のenvironmentにLINE Developerに記載されているID,Secret,Token記述してください.
 - CHANNEL_ID 'hogehoge'
 - CHANNEL_SECRET 'hogehoge'
 - CHANNEL_TOKEN 'hogehoge'
3. sls deploy
