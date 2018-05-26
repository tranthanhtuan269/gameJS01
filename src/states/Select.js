import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.tween = null
    this.popup = null
  }

  preload () {
    console.log('running')
  }

  create () {
    this.setUpPopup()
    this.setUpButton()
  }

  setUpPopup() {
    let closeBtnWidth = 100
    this.popup = game.add.sprite(
                    this.game.world.centerX, 
                    this.game.world.centerY, 
                    'backgroundPopup'
                  );

    this.popup.alpha = 0.8;
    this.popup.anchor.set(0.5);
    this.popup.inputEnabled = true;
    // this.popup.input.enableDrag();

    var pw = (this.popup.width / 2) - closeBtnWidth;
    var ph = (this.popup.height / 2) + closeBtnWidth;

    //  And click the close button to close it down again
    var closeButton = this.game.make.sprite(pw, -ph, 'closeBtn');
    closeButton.inputEnabled = true;
    closeButton.input.priorityID = 1;
    closeButton.input.useHandCursor = true;
    closeButton.events.onInputDown.add(this.closeWindow, this);

    //  Add the "close button" to the popup window image
    this.popup.addChild(closeButton);

    //  Hide it awaiting a click
    this.popup.scale.set(0.6);
    this.popup.y = -400
  }

  setUpButton() {
    
    let buttonWidth = 100
    let buttonMargin = 20

    this.buttonLogin = this.game.add.button(
                      this.game.width - 3 * ( buttonWidth + buttonMargin ), 
                      50, 
                      'loginBtn', 
                      this.loginClick, 
                      this, 
                      2, 1, 0);

    this.buttonLogin.anchor.setTo(0.5, 0.5);
    this.buttonLogin.input.useHandCursor = true;

    this.buttonGuide = this.game.add.button(
                      this.game.width - 2 * ( buttonWidth + buttonMargin ), 
                      50, 
                      'guideBtn', 
                      this.guideClick, 
                      this, 
                      2, 1, 0);

    this.buttonGuide.anchor.setTo(0.5, 0.5);
    this.buttonGuide.input.useHandCursor = true;

    this.buttonGift = this.game.add.button(
                      this.game.width - ( buttonWidth + buttonMargin ), 
                      50, 
                      'giftBtn', 
                      this.giftClick, 
                      this, 
                      2, 1, 0);

    this.buttonGift.anchor.setTo(0.5, 0.5);
    // this.buttonGift.input.useHandCursor = true;
  }

  loginClick() {
    console.log('loginClick')
    $('#login-modal').modal('show')
    // if ((this.tween !== null && this.tween.isRunning) || this.popup.y === 500)
    // {
    //     return;
    // }
    
    // //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    // this.tween = this.game.add.tween(this.popup).to( { y: 500 }, 1000, Phaser.Easing.Linear.Out, true);
  }

  guideClick() {
    console.log('guideClick')
    $('#guide-modal').modal('show')
  }

  giftClick() {
    console.log('giftClick')
    $('#gift-modal').modal('show')
  }

  closeWindow() {
    if (this.tween && this.tween.isRunning || this.popup.y === -400)
    {
        return;
    }

    //  Create a tween that will close the window, but only if it's not already tweening or closed
    this.tween = this.game.add.tween(this.popup).to( { y: -400 }, 500, Phaser.Easing.Linear.In, true);
  }
}
