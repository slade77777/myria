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
            <div>
              <div className="text-base/9 mt-4 list-disc pl-4 font-light leading-[24px]">
                <div className="space-y-2">
                  <p>
                    This privacy notice (the “Privacy Notice”) explains the manner in which Myria
                    collects, processes and maintains personal data about You.
                  </p>
                  <p>
                    Any capitalised term or expression that is not defined in this Privacy Notice is
                    defined there.
                  </p>
                  <p>
                    Myria is committed to processing personal data in accordance with applicable
                    law. In its use of personal data, certain members of Myria will be characterised
                    under applicable law as a data controller, whilst certain of Myria’s service
                    providers, Affiliates and delegates may act as data processors under applicable
                    law. For the purposes of this Privacy Notice, we, us or our means each member of
                    Myria in its capacity (as relevant) as data controller of the personal data and
                    You or Your means the Product holder or relevant individual affiliated or
                    connected with the Product holder receiving this Privacy Notice.
                  </p>
                  <p>
                    If You are a nominee Product holder or a corporate entity, this Privacy Notice
                    will be relevant for those individuals connected to You and You should transmit
                    this document to such individuals for their awareness and consideration.
                  </p>
                  <p>
                    <b>Personal data:</b> By virtue of acquiring Products, Myria and certain other
                    service providers and their respective Affiliates and delegates (the “Authorised
                    Entities”) may collect, record, store, transfer and otherwise process personal
                    data by which individuals may be directly or indirectly identified. We may
                    combine personal data that You provide to us with personal data that we collect
                    from or about You. This may include personal data collected in an online or
                    offline context including from credit reference agencies and other available
                    public databases or data sources, such as news outlets, websites and other media
                    sources and international sanctions lists. It may also include data which, when
                    aggregated with other data, enables an individual to be identified, such as an
                    IP address and geolocation data.
                  </p>
                  <p>
                    <b>Why is Your personal data processed:</b> The storage, processing and use of
                    personal data by Myria will take place for lawful purposes, including:
                  </p>
                  <ul className="ml-4 list-decimal">
                    <li>
                      to comply with any applicable legal, tax or regulatory obligations on Myria or
                      another Authorised Entity under any applicable laws and regulations;{' '}
                    </li>
                    <li>
                      to perform a contract to which You are a party or for taking pre-contractual
                      steps at Your request;{' '}
                    </li>
                    <li>
                      to operate Myria, including managing and administering the Products and the
                      business of Myria on an on-going basis which enables Myria and its Product
                      holders to satisfy their contractual duties and obligations to each other;
                    </li>
                    <li>
                      to verify the identity of Myria to third parties for any purpose which Myria
                      considers necessary or desirable;
                    </li>
                    <li>
                      to assist Myria in the improvement and optimisation of advertising (including
                      through marketing material and content) its services;
                    </li>
                    <li>for risk management and risk control purposes relating to Myria;</li>
                    <li>
                      to pursue Myria’s or a third party’s legitimate interests: (i) for direct
                      marketing purposes; or (ii) to help detect, prevent, investigate, and
                      prosecute fraud and/or other criminal activity, and share this data with
                      legal, compliance, risk and managerial staff to assess suspicious activities;
                      and/or
                    </li>
                    <li>
                      where You otherwise consent to the processing of personal data for any other
                      specific purpose.
                    </li>
                  </ul>
                  <p>
                    As a data controller, we will only use Your personal data for the purposes for
                    which we collected it as set out in this Privacy Notice. If we need to use Your
                    personal data for an unrelated purpose, we will contact You. In certain
                    circumstances, we may share Your personal data with regulatory, prosecuting and
                    other governmental agencies or departments, and parties to litigation (whether
                    pending or threatened), in any country or territory.
                  </p>
                  <p>
                    We may transfer Your personal data outside of the British Virgin Islands, as
                    permitted under applicable law. We will not sell Your personal data.
                  </p>
                  <p>
                    <b>Your rights:</b> You may have certain rights under applicable law, including:
                  </p>
                  <ul className="ml-4 list-decimal">
                    <li>
                      the right to be informed as to how we collect and use Your personal data;{' '}
                    </li>
                    <li>the right to access Your personal data;</li>
                    <li>the right to require us to stop direct marketing;</li>
                    <li>the right to have inaccurate or incomplete personal data corrected;</li>
                    <li>
                      the right to withdraw Your consent and require us to stop processing or
                      restrict the processing, or not begin the processing, of Your personal data;{' '}
                    </li>
                    <li>
                      the right to be notified of a data breach (unless the breach is unlikely to be
                      prejudicial); and
                    </li>
                    <li>
                      the right to require us to delete Your personal data in some limited
                      circumstances.{' '}
                    </li>
                  </ul>
                  <p>
                    Please note that if You do not wish to provide us with requested personal data
                    or subsequently withdraw Your consent, You may not be able to hold or otherwise
                    deal with the Products or remain as a holder of the Products as it will affect
                    our ability to provide our services to You as a Product holder.
                  </p>
                  <p>
                    <b>Retention of Personal Data:</b> The personal data shall not be held by Myria
                    for longer than necessary with regard to the purposes of the data processing.
                  </p>
                  <p>
                    <b>Changes to Privacy Notice:</b> We encourage You to regularly review this and
                    any updated Privacy Notice to ensure that You are always aware of how personal
                    data is collected, used, stored and disclosed.{' '}
                  </p>
                  <p>
                    <b>Contact Us:</b> Please contact Myria if You have any questions about this
                    Privacy Notice, the personal data we hold about You or to discuss Your rights
                    under applicable law.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {onAgree && (
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
          )}
          {onAgree && (
            <div className="flex w-full justify-end">
              <Button
                className="btn-lg btn-primary justify-end px-10 disabled:bg-gray-500 disabled:text-white disabled:opacity-50"
                disabled={!agree}
                onClick={onAgree}>
                <Trans>Accept</Trans>
              </Button>
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default PrivacyPolicyModal;
