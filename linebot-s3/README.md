# これはなんですか

Linebot, もしくはLinebotが所属するグループに投げた画像をS3に保存するやつです。  
AWSのサービスを利用しています。  
ServerlessFrameworkで構成管理されています。  

LineServerはLINEトーク内に貼り付けた画像の保存期間を2週間と定めている。(アルバム画像は除く)  
後で「あの画像が欲しい!」となってても2週間前の画像は削除されてるので再度送り直してもらったりするのが手間なので、全部S3に放り込んじゃおうというやつです。



# 使い方

1.  `npm install` or `yarn install`でパッケージをインストールします.
2. `serverless.yml`のenvironmentにLINE Developerに記載されているID,Secret,Token記述してください.
 - CHANNEL_ID 'hogehoge'
 - CHANNEL_SECRET 'hogehoge'
 - CHANNEL_TOKEN 'hogehoge'
3. sls deploy


