<?php

namespace OCA\MergeODF\Notification;

use OCP\Notification\INotifier;
use OCP\Notification\INotification;

class Notifier implements INotifier
{
    protected $factory;
    protected $url;

    public function __construct()
    {
    }

    public function getID():string
    {
        return "mergeodf";
    }

    public function getName():string
    {
        return "mergeodf";
    }

    public function prepare(INotification $notification, $languageCode): INotification
    {
        if ($notification->getApp() !== 'mergeodf') {
            // Not my app => throw
            throw new \InvalidArgumentException();
        }
        // Read the language from the notification
        $parameters = $notification->getSubjectParameters();
        switch ($notification->getSubject()) {
            case 'upload-success':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本同步結果\n";
                $message = $message . $parameters['filename'] . " 遠端同步成功";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'upload-fail':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本同步結果\n";
                $message = $message . $parameters['filename'] . " 遠端同步失敗";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'delete-success':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本同步結果\n";
                $message = $message . $parameters['filename'] . " 遠端刪除成功";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'delete-fail':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本同步結果\n";
                $message = $message . $parameters['filename'] . " 遠端刪除失敗";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'update-success':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本同步結果\n";
                $message = $message . $parameters['filename'] . " 遠端更新成功";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'update-fail':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本同步結果\n";
                $message = $message . $parameters['filename'] . " 遠端更新失敗";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'sync-result':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $sync_result = $parameters['sync_result'];
                $message = "[".$parameters['mount_point']."] 範本同步結果彙整\n";
                foreach ($sync_result as $filename => $result) {
                    $message = $message . "<" .$result . "> " . $filename . "\n";
                }
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            case 'sync-empty':
                $subject = "報表範本通知( ".$parameters['api_server']." )";
                $subjectParameters = [];
                $message = "[".$parameters['mount_point']."] 範本無同步需求\n";
                $messageParameters = [];
                $notification->setRichSubject($subject, $subjectParameters)
                    ->setParsedSubject($subject)
                    ->setRichMessage($message, $messageParameters)
                    ->setParsedMessage($message);
                return $notification;
            default:
                return $notification;
        }
    }
}
