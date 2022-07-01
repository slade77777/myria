import { Trans } from '@lingui/macro';
import Modal from 'src/components/Modal';
import Input from 'src/components/Input';
import React from 'react';
import Button from 'src/components/core/Button';

const TermsOfServiceModal = ({
  open,
  onClose,
  onAgree
}: {
  open: boolean;
  onClose?: () => void;
  onAgree?: () => void;
}) => {
  const [agree, setAgree] = React.useState(false);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title="Terms of Service"
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:max-w-[832px]">
        <div className="p-8">
          <div>
            <p className="mb-6">
              <Trans>
                Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle paleo salvia sartorial
                crucifix dreamcatcher try-hard ugh lyft. Intelligentsia whatever mlkshk salvia,
                authentic jianbing wolf coloring book echo park fam. Iceland cray occupy ennui,
                franzen tilde poke. Poutine echo park meditation cliche franzen, shaman messenger
                bag. Hot chicken umami adaptogen DIY yuccie whatever subway tile, narwhal helvetica
                meggings scenester twee iPhone tumblr lumbersexual.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                Meditation ramps offal direct trade raclette disrupt vice. Neutra kogi mixtape 3
                wolf moon. Organic mustache chia vape, la croix austin man bun small batch meh
                bushwick locavore. Biodiesel shabby chic butcher franzen pork belly microdosing,
                tattooed chambray twee meditation offal YOLO pour-over.
              </Trans>
            </p>
            <p className="mb-6">
              <Trans>
                Leggings swag synth 8-bit master cleanse. Pitchfork affogato semiotics raclette,
                adaptogen post-ironic cliche meggings tousled paleo 90&apos;s next level.
              </Trans>
            </p>
          </div>
          <div className="mb-8 flex">
            <Input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.currentTarget.checked)}
            />
            <p className="ml-4">
              <Trans>I have read, understood and agree to the terms of service</Trans>
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

export default TermsOfServiceModal;
