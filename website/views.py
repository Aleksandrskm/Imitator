from flask import Blueprint, render_template, url_for

views = Blueprint("views", __name__)

@views.route('/')
def index():
    return render_template('base.html')

@views.route('/call__simulator')
def function_call():
    return render_template('call__simulator.html')

@views.route('/call_flow_simulator')
def function_call_flow():
    return render_template('call_flow_simulator.html')

@views.route('/calls_simulator')
def function_calls():
    return render_template('calls_simulator.html')
@views.route('/call_flow_sov')
def function_calls_flow():
    return render_template('call_flow_sov.html')