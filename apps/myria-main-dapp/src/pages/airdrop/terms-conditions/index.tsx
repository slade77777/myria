import React from 'react';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import Page from 'src/components/Page';

type Props = {};

export default function index({}: Props) {
  function scrollToDefinitions() {
    const element = document.getElementById('definitions');
    element?.scrollIntoView();
  }
  return (
    <Page action="mint">
      <div className={`${headerNavSpacingClassName} terms-conditions mx-auto max-w-[832px]`}>
        <div className="pt-[80px] pb-[160px]">
          <div>
            <h1 className="text-center text-[40px] font-bold leading-[60px] text-white">
              TERMS AND CONDITIONS OF THE CONTEST “$MYRIA [NFT] AIRDROP’’
            </h1>
          </div>
          {/* Eligibility */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">1. Eligibility: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                This Campaign is open only to those who complete the missions as described at point
                4.1 Employees of Myria, its affiliates, subsidiaries, advertising and promotion
                agencies, and suppliers, (collectively the “Employees”), and immediate family
                members and/or those living in the same household of Employees are not eligible to
                participate in the Campaign. The Campaign is subject to all applicable federal,
                state, and local laws and regulations. Void where prohibited.
              </span>
            </p>
          </div>
          {/* Agreement to Rules */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">2. Agreement to Rules: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                By participating, the Contestant (“You”) agree to be fully unconditionally bound by
                these Rules, and You represent and warrant that You meet the eligibility
                requirements. In addition, you agree to accept the decisions of Myria as final and
                binding as it relates to the content of this Campaign.
              </span>
            </p>
          </div>
          {/* Campaign Period */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">3. Campaign Period: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                Entries will be accepted online starting on November 23, 2022 and ending January 23,
                2023.
              </span>
            </p>
          </div>
          {/* How to Enter: */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">4. How to Enter: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                The Campaign must be entered through either a dedicated link that will be provided
                by Myria, so Users can Home Page banner and/or via direct copy-paste of its URL or
                by tapping on the relevant Homepage Banner, implemented at Launch. The entry must
                fulfill all Campaign requirements, as specified, to be eligible to win a prize.
                Entries that are incomplete or do not adhere to the rules or specifications may be
                disqualified at the sole discretion of Myria. You must provide the information
                requested. You may not enter more times than indicated by using multiple email
                addresses, identities, or devices in an attempt to circumvent the rules. If you use
                fraudulent methods or otherwise attempt to circumvent the rules, your submission may
                be removed from eligibility at the sole discretion of Myria.
              </span>
            </p>
          </div>
          {/* Tasks to be eligible */}
          <div className="mt-6">
            <span className=" mb-1 text-xl font-bold leading-[26px]	">
              4.1. Tasks to be eligible:
            </span>
            <div className="text-base/9  list-disc  space-y-1 pl-8 font-light leading-[24px] ">
              <p>
                <input type="radio" disabled className="mr-3" />
                Follow Myria on Twitter,
              </p>
              <p>
                <input type="radio" disabled className="mr-3" />
                Follow Brendan
                <a href="https://mobile.twitter.com/brendan_duhamel">
                  &nbsp;[https://mobile.twitter.com/brendan_duhamel]&nbsp;
                </a>
                on Twitter,
              </p>
              <p>
                <input type="radio" disabled className="mr-3" />
                Invite Friends (Referrals), via referral link that will be provided by Myria,
              </p>
              <p>
                <input type="radio" disabled className="mr-3" />
                Join Discord,
              </p>
              <p>
                <input type="radio" disabled className="mr-3" />
                Daily log in to Discord
              </p>
              <p>
                <input type="radio" disabled className="mr-3" />
                Share a post on Twitter
              </p>
              <p>
                <input type="radio" disabled className="mr-3" />
                Reaching Citizen Status (Activity Status) on Discord
              </p>
            </div>
          </div>
          {/* Prizes */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">5. Prizes: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                The Winners of the Campaign will receive MYRIA NFTs. There will be a potentially
                unlimited number of Winners and every winner will receive AT LEAST one MYRIA NFT.
                Winnings will be transferred to winners within 5 months from the start of the
                Campaign. No cash or other prize substitution shall be permitted except at Myria
                discretion. The prize is non-transferable. Any and all prize-related expenses,
                including without limitation any and all federal, state, and/or local taxes, shall
                be the sole responsibility of the winner. No substitution of prize or
                transfer/assignment of prize to others or request for the cash equivalent by Winner
                is permitted. Acceptance of prize constitutes permission for Myria to use Winner’s
                name, likeness, and entry for purposes of advertising and trade without further
                compensation, unless prohibited by law.
              </span>
            </p>
          </div>
          {/* Odds */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">6. Odds: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                The odds of winning depend on the number of eligible entries received. Upon
                completion of at least one mission You will receive a prize.
              </span>
            </p>
          </div>
          {/* Winner Selection and Notification */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">
                7. Winner Selection and Notification:{' '}
              </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                Winners will be selected under the supervision of Myria. Myria shall have no
                liability for Winner’s failure to receive notices due to spam, junk e-mail or other
                security settings or for Winner’s provision of incorrect or otherwise
                non-functioning contact information. If the winner provides a wrong address or any
                other way to contact him/her, and the winner does not receive the prize, Myria is
                not responsible for this and will not duplicate the prize. ANY VIOLATION OF THESE
                OFFICIAL RULES BY WINNER (AT MYRIA’S SOLE DISCRETION) WILL RESULT IN WINNER’S
                DISQUALIFICATION AS WINNER OF THE CAMPAIGN, AND ALL PRIVILEGES AS WINNER WILL BE
                IMMEDIATELY TERMINATED.
              </span>
            </p>
          </div>
          {/* 8. Rights Granted by You */}
          <div className="mt-6">
            <p>
              <span className=" text-xl font-bold leading-[26px]	">8. Rights Granted by You: </span>
              <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                By entering this content (e.g., photo, video, text, etc.), You understand and agree
                that Myria, anyone acting on behalf of Myria, and Myria’s licensees, successors, and
                assigns, shall have the right, where permitted by law, to print, publish, broadcast,
                distribute, and use in any media now known or hereafter developed, in perpetuity and
                throughout the World, without limitation, your entry, name, portrait, picture,
                voice, likeness, image, statements about the Campaign, and biographical information
                for news, publicity, information, trade, advertising, public relations, and
                promotional purposes. without any further compensation, notice, review, or consent.
                Optional verbiage for Contests: By entering this content, you represent and warrant
                that your entry is an original work of authorship, and does not violate any third
                party’s proprietary or intellectual property rights. If your entry infringes upon
                the intellectual property right of another, you will be disqualified at the sole
                discretion of Myria. If the content of your entry is claimed to constitute
                infringement of any proprietary or intellectual proprietary rights of any third
                party, you shall, at your sole expense, defend or settle against such claims. You
                shall indemnify, defend, and hold harmless Myria from and against any suit,
                proceeding, claims, liability, loss, damage, costs or expense, which Myria may
                incur, suffer, or be required to pay arising out of such infringement or suspected
                infringement of any third party’s right.
              </span>
            </p>
            {/* 9. Terms & Conditions: */}
            <div className="mt-6">
              <p>
                <span className=" text-xl font-bold leading-[26px]	">9. Terms & Conditions: </span>
                <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                  Myria reserves the right, in its sole discretion, to cancel, terminate, modify or
                  suspend the Campaign should virus, bug, non-authorized human intervention, fraud,
                  or other cause beyond Myria control corrupt or affect the administration,
                  security, fairness, or proper conduct of the Campaign. In such a case, Myria may
                  select the Winner from all eligible entries posted prior to and/or after (if
                  appropriate) the action taken by Myria. Myria reserves the right, in its sole
                  discretion, to disqualify any individual who tampers or attempts to tamper with
                  the entry process or the operation of the Campaign or website or violates these
                  Terms & Conditions. Myria has the right, in its sole discretion, to maintain the
                  integrity of the Campaign, to void votes for any reason, including, but not
                  limited to: multiple entries from the same user from different IP addresses;
                  multiple entries from the same computer in excess of that allowed by Campaign
                  rules; or the use of bots, macros, scripts, or other technical means for entering.
                  Any attempt by an entrant to deliberately damage any website or undermine the
                  legitimate operation of the Campaign may be a violation of criminal and civil
                  laws. Should such an attempt be made, Myria reserves the right to seek damages to
                  the fullest extent permitted by law.
                </span>
              </p>
            </div>
            {/* 10. Limitation of Liability: */}
            <div className="mt-6">
              <p>
                <span className=" text-xl font-bold leading-[26px]	">
                  10. Limitation of Liability:{' '}
                </span>
                <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                  By participating, you agree to release and hold harmless Myria and its
                  subsidiaries, affiliates, advertising and promotion agencies, partners,
                  representatives, agents, successors, assigns, employees, officers, and directors
                  from any liability, illness, injury, death, loss, litigation, claim, or damage
                  that may occur, directly or indirectly, whether caused by negligence or not, from:
                  (i) such entrant’s participation in the Campaign and/or his/her acceptance,
                  possession, use, or misuse of any prize or any portion thereof; (ii) technical
                  failures of any kind, including but not limited to the malfunction of any
                  computer, cable, network, hardware, or software, or other mechanical equipment;
                  (iii) the unavailability or inaccessibility of any transmissions, telephone, or
                  Internet service; (iv) unauthorized human intervention in any part of the entry
                  process or the Promotion; (v) electronic or human error in the administration of
                  the Promotion or the processing of entries.
                </span>
              </p>
            </div>
            {/* 11. Disclaimer */}
            <div className="mt-6">
              <p>
                <span className=" text-xl font-bold leading-[26px]	">11. Disclaimer: </span>
                <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                  In accepting these Terms and Conditions, You give Myria permission to communicate
                  by email for relevant and related commercial emails. Myria may use email addresses
                  to periodically send promotional emails about products and services, offers or
                  updates relating to recent developments in our services that may be relevant. In
                  accordance with The Unsolicited Electronic Messages Act, if You do not wish to
                  receive such emails, please advise us and we will immediately unsubscribe that
                  person from such emails. Myria will not authorize any third party to use Your
                  email addresses to send unsolicited emails.
                </span>
              </p>
            </div>
            {/* 11. Disputes */}
            <div className="mt-6">
              <p>
                <span className=" text-xl font-bold leading-[26px]	">12. Disputes: </span>
                <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                  THIS Campaign IS GOVERNED BY THE LAWS OF THE CAYMAN ISLANDS WITHOUT RESPECT TO
                  CONFLICT OF LAW DOCTRINES. As a condition of participating in this Campaign,
                  participants agree that any and all disputes that cannot be resolved between the
                  parties, and causes of action arising out of or connected with this Campaign,
                  shall be resolved individually, without resort to any form of class action,
                  exclusively before a court located in The Cayman Islands having jurisdiction.
                  Further, in any such dispute, under no circumstances shall participant be
                  permitted to obtain awards for, and hereby waives all rights to, punitive,
                  incidental, or consequential damages, including reasonable attorney’s fees, other
                  than participant’s actual out-of-pocket expenses (i.e. costs associated with
                  entering this Campaign). Participant further waives all rights to have damages
                  multiplied or increased.
                </span>
              </p>
            </div>

            {/* 13. Sponsor */}
            <div className="mt-6">
              <p>
                <span className=" text-xl font-bold leading-[26px]	">13. Sponsor: </span>
                <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                  The Sponsor of the Campaign is Myria.
                </span>
              </p>
            </div>

            {/* 14. */}
            <div className="mt-6">
              <p>
                <span className=" text-xl font-bold leading-[26px]	">14. </span>
                <span className="text-base/9 list-disc  space-y-1  text-justify font-light leading-[24px]">
                  By participating in the contest, You, the contestant, have affirmatively reviewed,
                  accepted, and agreed to this Terms & Conditions.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
