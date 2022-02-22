import * as cdk from '@aws-cdk/core';
import * as imagebuilder from '@aws-cdk/aws-imagebuilder';

export class EC2ImageBuilderStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const EC2ImageBuilderPipelineName =
      this.node.tryGetContext('root-name') + '-image-builder-pipeline'
    const InfrastructureConfigurationName =
      this.node.tryGetContext('root-name') + '-infrastructure-configuration'
    console.log("EC2 Image Builder pipeline name: " +
      JSON.stringify(EC2ImageBuilderPipelineName))
    
    const cfnInfrastructureConfiguration = new imagebuilder.CfnInfrastructureConfiguration(this, InfrastructureConfigurationName, {
      instanceProfileName: 'instanceProfileName',
      name: InfrastructureConfigurationName,

      // the properties below are optional
      // description: 'description',
      // instanceMetadataOptions: {
      //   httpPutResponseHopLimit: 123,
      //   httpTokens: 'httpTokens',
      // },
      // instanceTypes: ['instanceTypes'],
      // keyPair: 'keyPair',
      // logging: {
      //   s3Logs: {
      //     s3BucketName: 's3BucketName',
      //     s3KeyPrefix: 's3KeyPrefix',
      //   },
      // },
      // resourceTags: {
      //   resourceTagsKey: 'resourceTags',
      // },
      // securityGroupIds: ['securityGroupIds'],
      // snsTopicArn: 'snsTopicArn',
      // subnetId: 'subnetId',
      // tags: {
      //   tagsKey: 'tags',
      // },
      // terminateInstanceOnFailure: false,
    })

    const cfnImagePipeline = new imagebuilder.CfnImagePipeline(this, EC2ImageBuilderPipelineName, {
      infrastructureConfigurationArn: cfnInfrastructureConfiguration.ref,
      name: EC2ImageBuilderPipelineName,

      // the properties below are optional
      // containerRecipeArn: 'containerRecipeArn',
      // description: 'description',
      // distributionConfigurationArn: 'distributionConfigurationArn',
      // enhancedImageMetadataEnabled: false,
      // imageRecipeArn: 'imageRecipeArn',
      // imageTestsConfiguration: {
      //   imageTestsEnabled: false,
      //   timeoutMinutes: 123,
      // },
      // schedule: {
      //   pipelineExecutionStartCondition: 'pipelineExecutionStartCondition',
      //   scheduleExpression: 'scheduleExpression',
      // },
      // status: 'status',
      // tags: {
      //   tagsKey: 'tags',
      // },
    })
  }
}
