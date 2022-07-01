import { Trans } from '@lingui/macro';
import Modal from 'src/components/Modal';
import Input from 'src/components/Input';
import React, { useCallback } from 'react';
import Button from 'src/components/core/Button';

const PrivacyPolicyModal = ({
  open,
  onClose,
  onAgree
}: {
  open: boolean;
  onClose?: () => void;
  onAgree?: () => void;
}) => {
  const [agree, setAgree] = React.useState(false);
  const renderListItem = useCallback((text: string) => {
    return (
      <div className="flex flex-row gap-4">
        •
        <p className="mb-6">
          <Trans>
            to comply with any applicable legal, tax or regulatory obligations on the Issuer Group
            or another Authorised Entity under any applicable laws and regulations;
          </Trans>
        </p>
      </div>
    );
  }, []);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title="PRIVACY POLICY"
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:max-w-[832px]">
        <div className="p-8">
          <div className="h-[50vh] overflow-y-scroll">
            <p className="mb-6">
              <Trans>
                This privacy notice (the “<b>Privacy Notice</b>”) explains the manner in which
                Metagalactic Jump Ltd. and its Affiliates (the “<b>Issuer Group</b>”) collects,
                processes and maintains personal data about You.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                Any capitalised term or expression used in this Privacy Notice that is not defined
                herein is defined in the Product Terms and Conditions.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                The Issuer Group is committed to processing personal data in accordance with
                applicable law. In its use of personal data, certain members of the Issuer Group
                will be characterised under applicable law as a data controller, whilst certain of
                the Issuer Group’s service providers, Affiliates and delegates may act as data
                processors under applicable law. For the purposes of this Privacy Notice,{' '}
                <b>we, us or our</b> means each member of the Issuer Group in its capacity (as
                relevant) as data controller of the personal data and <b>You</b> or <b>Your</b>{' '}
                means the Product holder or relevant individual affiliated or connected with the
                Product holder receiving this Privacy Notice.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                If You are a nominee Product holder or a corporate entity, this Privacy Notice will
                be relevant for those individuals connected to You and You should transmit this
                document to such individuals for their awareness and consideration.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                <b>Personal data</b>: By virtue of acquiring Products, the Issuer Group and certain
                other service providers and their respective Affiliates and delegates (the “
                <b>Authorised Entities</b>”) may collect, record, store, transfer and otherwise
                process personal data by which individuals may be directly or indirectly identified.
                We may combine personal data that You provide to us with personal data that we
                collect from or about You. This may include personal data collected in an online or
                offline context including from credit reference agencies and other available public
                databases or data sources, such as news outlets, websites and other media sources
                and international sanctions lists. It may also include data which, when aggregated
                with other data, enables an individual to be identified, such as an IP address and
                geolocation data.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                <b>Why is Your personal data processed</b>: The storage, processing and use of
                personal data by the Issuer Group will take place for lawful purposes, including:
              </Trans>
            </p>
            {renderListItem(
              'to comply with any applicable legal, tax or regulatory obligations on the Issuer Group or another Authorised Entity under any applicable laws and regulations; '
            )}
            {renderListItem(
              'to perform a contract to which You are a party or for taking pre-contractual steps at Your request;'
            )}
            {renderListItem(
              'to operate the Issuer Group, including managing and administering the Products and the business of the Issuer Group on an on-going basis which enables the Issuer Group and its Product holders to satisfy their contractual duties and obligations to each other;'
            )}
            {renderListItem(
              'to verify the identity of the Issuer Group to third parties for any purpose which the Issuer Group considers necessary or desirable;'
            )}
            {renderListItem(
              'to assist the Issuer Group in the improvement and optimisation of advertising (including through marketing material and content) its services;'
            )}
            {renderListItem(
              'for risk management and risk control purposes relating to the Issuer Group;'
            )}
            {renderListItem(
              'to pursue the Issuer Group’s or a third party’s legitimate interests: (i) for direct marketing purposes; or (ii) to help detect, prevent, investigate, and prosecute fraud and/or other criminal activity, and share this data with legal, compliance, risk and managerial staff to assess suspicious activities; and/or'
            )}
            {renderListItem(
              'where You otherwise consent to the processing of personal data for any other specific purpose.'
            )}
            <p className="mb-6">
              <Trans>
                As a data controller, we will only use Your personal data for the purposes for which
                we collected it as set out in this Privacy Notice. If we need to use Your personal
                data for an unrelated purpose, we will contact You. In certain circumstances, we may
                share Your personal data with regulatory, prosecuting and other governmental
                agencies or departments, and parties to litigation (whether pending or threatened),
                in any country or territory.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                We may transfer Your personal data outside of the British Virgin Islands, as
                permitted under applicable law. We will not sell Your personal data.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                <b>Your rights:</b> You may have certain rights under applicable law, including:
              </Trans>
            </p>
            {renderListItem(
              'the right to be informed as to how we collect and use Your personal data; '
            )}
            {renderListItem('the right to access Your personal data;')}
            {renderListItem('the right to require us to stop direct marketing;')}
            {renderListItem('the right to have inaccurate or incomplete personal data corrected;')}
            {renderListItem(
              'the right to withdraw Your consent and require us to stop processing or restrict the processing, or not begin the processing, of Your personal data;'
            )}
            {renderListItem(
              'the right to be notified of a data breach (unless the breach is unlikely to be prejudicial); and'
            )}
            {renderListItem(
              'the right to require us to delete Your personal data in some limited circumstances. \n'
            )}
            <p className="mb-6">
              <Trans>
                Please note that if You do not wish to provide us with requested personal data or
                subsequently withdraw Your consent, You may not be able to hold or otherwise deal
                with the Products or remain as a holder of the Products as it will affect our
                ability to provide our services to You as a Product holder.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                <b>Retention of Personal Data:</b> The personal data shall not be held by the Issuer
                Group for longer than necessary with regard to the purposes of the data processing.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                <b>Changes to Privacy Notice:</b> We encourage You to regularly review this and any
                updated Privacy Notice to ensure that You are always aware of how personal data is
                collected, used, stored and disclosed.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                <b>Contact Us</b>: Please contact the Issuer Group if You have any questions about
                this Privacy Notice, the personal data we hold about You or to discuss Your rights
                under applicable law.
              </Trans>
            </p>
          </div>
          <div className="mb-8 flex pt-4">
            <Input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.currentTarget.checked)}
            />
            <p className="ml-4">
              <Trans>I have read, understood and agree to the privacy and policy</Trans>
            </p>
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="btn-lg btn-primary justify-end px-10"
              disabled={!agree}
              onClick={onAgree}>
              <Trans>Accept</Trans>
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default PrivacyPolicyModal;
